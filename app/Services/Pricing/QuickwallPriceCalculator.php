<?php

namespace App\Services\Pricing;

use App\Exceptions\InvalidQuickwallConfigurationException;

class QuickwallPriceCalculator
{
    public function calculate(array $options): array
    {
        $width = (int) ($options['width'] ?? 0);
        $height = (int) ($options['height'] ?? 0);
        $installationMethod =
            $options['installation_method'] ?? null;

        $basePrice = $this->calculateBasePrice(
            width: $width,
            height: $height,
            installationMethod: $installationMethod,
        );

        $postCost = $this->calculatePostCost(
            options: $options,
            height: $height,
        );

        $bottomPlateCost =
            $this->calculateBottomPlateCost(
                options: $options,
                width: $width,
            );

        $colourCoatingCost =
            $this->calculateColourCoatingCost($options);

        $hooksCost = $this->calculateHooksCost($options);

        $assemblyKitCost = (float) config(
            'product-pricing.quickwall.accessories.assembly_kit',
            0,
        );

        $netPrice = round(
            $basePrice
            + $postCost
            + $bottomPlateCost
            + $colourCoatingCost
            + $hooksCost
            + $assemblyKitCost,
            2,
        );

        $vatRate = (float) config(
            'product-pricing.quickwall.vat_rate',
            0.19,
        );

        $vatAmount = round($netPrice * $vatRate, 2);
        $grossPrice = round($netPrice + $vatAmount, 2);

        return [
            'base_price' => $basePrice,
            'post_cost' => $postCost,
            'bottom_plate_cost' => $bottomPlateCost,
            'colour_coating_cost' => $colourCoatingCost,
            'hooks_cost' => $hooksCost,
            'assembly_kit_cost' => $assemblyKitCost,
            'net_price' => $netPrice,
            'vat_rate' => $vatRate,
            'vat_amount' => $vatAmount,
            'gross_price' => $grossPrice,
        ];
    }

    private function calculateBasePrice(
        int $width,
        int $height,
        ?string $installationMethod,
    ): float {
        $widths = config(
            'product-pricing.quickwall.widths',
            [],
        );

        $priceTables = config(
            'product-pricing.quickwall.installation_prices',
            [],
        );

        if (! in_array($width, $widths, true)) {
            throw new InvalidQuickwallConfigurationException(
                'The selected Quickwall width is unavailable.'
            );
        }

        if (! isset($priceTables[$installationMethod])) {
            throw new InvalidQuickwallConfigurationException(
                'The selected installation method is unavailable.'
            );
        }

        $heightRow =
            $priceTables[$installationMethod][$height] ?? null;

        if (! is_array($heightRow)) {
            throw new InvalidQuickwallConfigurationException(
                'The selected Quickwall height is unavailable.'
            );
        }

        $widthIndex = array_search(
            $width,
            $widths,
            true,
        );

        if (
            $widthIndex === false ||
            ! array_key_exists($widthIndex, $heightRow)
        ) {
            throw new InvalidQuickwallConfigurationException(
                'This width and height combination is unavailable.'
            );
        }

        return (float) $heightRow[$widthIndex];
    }

    private function calculatePostCost(
        array $options,
        int $height,
    ): float {
        $centerPosts = $this->positiveInteger(
            $options['center_posts'] ?? 0,
        );

        $cornerPosts = $this->positiveInteger(
            $options['corner_posts'] ?? 0,
        );

        if ($centerPosts === 0 && $cornerPosts === 0) {
            return 0;
        }

        $unitPrice = config(
            "product-pricing.quickwall.post_prices.{$height}",
        );

        if ($unitPrice === null) {
            throw new InvalidQuickwallConfigurationException(
                'Posts are unavailable for this height.'
            );
        }

        return (float) $unitPrice
            * ($centerPosts + $cornerPosts);
    }

    private function calculateBottomPlateCost(
        array $options,
        int $width,
    ): float {
        $panelQuantity = $this->positiveInteger(
            $options['quickwall_panels'] ?? 0,
        );

        if ($panelQuantity === 0) {
            return 0;
        }

        $unitPrice = (float) config(
            'product-pricing.quickwall.accessories.'
            .'bottom_plate_per_running_meter',
            0,
        );

        $widthInMetres = $width / 1000;

        return (float) ceil(
            $panelQuantity
            * $widthInMetres
            * $unitPrice
        );
    }

    private function calculateColourCoatingCost(
        array $options,
    ): float {
        if (
            ($options['corner_profiles_coloring'] ?? null)
            !== 'with'
        ) {
            return 0;
        }

        $cornerPosts = $this->positiveInteger(
            $options['corner_posts'] ?? 0,
        );

        $unitPrice = (float) config(
            'product-pricing.quickwall.accessories.'
            .'corner_profile_colour_coating',
            0,
        );

        return $cornerPosts * $unitPrice;
    }

    private function calculateHooksCost(
        array $options,
    ): float {
        $hookQuantity = $this->positiveInteger(
            data_get(
                $options,
                'accessory_quantities.quickwall_hooks',
                0,
            ),
        );

        $unitPrice = (float) config(
            'product-pricing.quickwall.accessories.hook',
            0,
        );

        return $hookQuantity * $unitPrice;
    }

    private function positiveInteger(mixed $value): int
    {
        $number = filter_var(
            $value,
            FILTER_VALIDATE_INT,
        );

        return $number !== false && $number > 0
            ? $number
            : 0;
    }
}