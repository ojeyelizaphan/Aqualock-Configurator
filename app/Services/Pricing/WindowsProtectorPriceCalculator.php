<?php

namespace App\Services\Pricing;

use App\Exceptions\InvalidWindowsProtectorConfigurationException;

class WindowsProtectorPriceCalculator
{
    public function calculate(array $options): array
    {
        $enteredWidth = $this->requiredNumber(
            $options,
            'entered_width',
        );

        $enteredHeight = $this->requiredNumber(
            $options,
            'entered_height',
        );

        if (
            $enteredWidth < 400 ||
            $enteredWidth > 1800 ||
            $enteredHeight < 400 ||
            $enteredHeight > 1800
        ) {
            throw new InvalidWindowsProtectorConfigurationException(
                'The entered dimensions must be between 400 and 1800 mm.'
            );
        }

        $installationMethod =
            $options['installation_method'] ?? null;

        if (! in_array(
            $installationMethod,
            [
                'on_window_frame',
                'on_opening_wall',
            ],
            true,
        )) {
            throw new InvalidWindowsProtectorConfigurationException(
                'Please select a valid installation method.'
            );
        }

        $hatchType =
            $options['hatch_type'] ?? 'none';

        if (! in_array(
            $hatchType,
            ['none', 'removable', 'tilt-up'],
            true,
        )) {
            throw new InvalidWindowsProtectorConfigurationException(
                'The selected hatch type is invalid.'
            );
        }

        $baseTable = config(
            "product-pricing.windows-protector."
            ."base_prices.{$hatchType}",
            [],
        );

        [
            'width' => $productWidth,
            'height' => $productHeight,
            'price' => $windowBasePrice,
        ] = $this->findBasePrice(
            priceTable: $baseTable,
            enteredWidth: $enteredWidth,
            enteredHeight: $enteredHeight,
        );

        $hatchPrice = $this->calculateHatchPrice(
            options: $options,
            hatchType: $hatchType,
            productWidth: $productWidth,
            productHeight: $productHeight,
        );

        $assemblyKitCost = (float) config(
            'product-pricing.windows-protector.'
            .'assembly_kit_price',
            136,
        );

        $netPrice = round(
            $windowBasePrice
            + $hatchPrice
            + $assemblyKitCost,
            2,
        );

        $vatRate = (float) config(
            'product-pricing.windows-protector.'
            .'vat_rate',
            0.19,
        );

        $vatAmount = round(
            $netPrice * $vatRate,
            2,
        );

        return [
            'entered_width' => $enteredWidth,
            'entered_height' => $enteredHeight,
            'product_width' => $productWidth,
            'product_height' => $productHeight,
            'hatch_type' => $hatchType,
            'window_base_price' => $windowBasePrice,
            'hatch_price' => $hatchPrice,
            'assembly_kit_cost' => $assemblyKitCost,
            'net_price' => $netPrice,
            'vat_rate' => $vatRate,
            'vat_amount' => $vatAmount,
            'gross_price' => round(
                $netPrice + $vatAmount,
                2,
            ),
        ];
    }

    private function findBasePrice(
        array $priceTable,
        int $enteredWidth,
        int $enteredHeight,
    ): array {
        $allWidths = config(
            'product-pricing.windows-protector.widths',
            [],
        );

        $heights = array_map(
            'intval',
            array_keys($priceTable),
        );

        sort($heights);

        $productHeight = $this->nextDimension(
            $enteredHeight,
            $heights,
        );

        if ($productHeight === null) {
            $this->notManufacturable();
        }

        $heightRow =
            $priceTable[$productHeight] ?? null;

        if (! is_array($heightRow)) {
            $this->notManufacturable();
        }

        $availableWidths = array_slice(
            $allWidths,
            0,
            count($heightRow),
        );

        $productWidth = $this->nextDimension(
            $enteredWidth,
            $availableWidths,
        );

        if ($productWidth === null) {
            $this->notManufacturable();
        }

        $widthIndex = array_search(
            $productWidth,
            $allWidths,
            true,
        );

        if (
            $widthIndex === false ||
            ! array_key_exists(
                $widthIndex,
                $heightRow,
            )
        ) {
            $this->notManufacturable();
        }

        return [
            'width' => $productWidth,
            'height' => $productHeight,
            'price' => (float)
                $heightRow[$widthIndex],
        ];
    }

    private function calculateHatchPrice(
        array $options,
        string $hatchType,
        int $productWidth,
        int $productHeight,
    ): float {
        if ($hatchType === 'none') {
            return 0;
        }

        if ($hatchType === 'removable') {
            $widthKey = 'removable_hatch_width';
            $heightKey = 'removable_hatch_height';
            $tableKey = 'removable';
        } else {
            $widthKey = 'tilt_up_hatch_width';
            $heightKey = 'tilt_up_hatch_height';
            $tableKey = 'tilt-up';
        }

        $width = $this->requiredNumber(
            $options,
            $widthKey,
        );

        $height = $this->requiredNumber(
            $options,
            $heightKey,
        );

        if (
            $width > ($productWidth - 100) ||
            $height > ($productHeight - 100)
        ) {
            throw new InvalidWindowsProtectorConfigurationException(
                'The selected hatch is too large for the Windows Protector.'
            );
        }

        $widths = config(
            "product-pricing.windows-protector."
            ."hatches.{$tableKey}.widths",
            [],
        );

        $priceTable = config(
            "product-pricing.windows-protector."
            ."hatches.{$tableKey}.prices",
            [],
        );

        $heightRow = $priceTable[$height] ?? null;

        $widthIndex = array_search(
            $width,
            $widths,
            true,
        );

        if (
            ! is_array($heightRow) ||
            $widthIndex === false ||
            ! array_key_exists(
                $widthIndex,
                $heightRow,
            )
        ) {
            throw new InvalidWindowsProtectorConfigurationException(
                'The selected hatch dimensions are unavailable.'
            );
        }

        return (float) $heightRow[$widthIndex];
    }

    private function nextDimension(
        int $enteredValue,
        array $dimensions,
    ): ?int {
        foreach ($dimensions as $dimension) {
            $dimension = (int) $dimension;

            if ($dimension >= $enteredValue) {
                return $dimension;
            }
        }

        return null;
    }

    private function requiredNumber(
        array $options,
        string $key,
    ): int {
        $value = filter_var(
            $options[$key] ?? null,
            FILTER_VALIDATE_INT,
        );

        if ($value === false || $value <= 0) {
            throw new InvalidWindowsProtectorConfigurationException(
                "The {$key} value is required."
            );
        }

        return $value;
    }

    private function notManufacturable(): never
    {
        throw new InvalidWindowsProtectorConfigurationException(
            'These Windows Protector dimensions cannot be manufactured.'
        );
    }
}