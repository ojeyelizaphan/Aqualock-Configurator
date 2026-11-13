@php
    $locale = app()->getLocale();

    if (!in_array($locale, ['en', 'de', 'fr', 'es'], true)) {
        $locale = 'en';
    }

    $copy = [
        'en' => [
            'title' => 'New Order Submitted',
            'customer' => 'Customer',
            'email' => 'Email',
            'phone' => 'Phone',
            'address' => 'Address',
            'product' => 'Product',
            'total' => 'Total Price',
            'details' => 'Configuration Details',
            'thanks' => 'Thanks,',
            'unspecified' => 'Not specified',
            'empty' => 'No configuration details found.',
            'type' => 'Type',
            'insulated' => 'Insulated',
        ],
        'de' => [
            'title' => 'Neue Anfrage eingegangen',
            'customer' => 'Kunde',
            'email' => 'E-Mail',
            'phone' => 'Telefon',
            'address' => 'Adresse',
            'product' => 'Produkt',
            'total' => 'Gesamtpreis',
            'details' => 'Konfigurationsdetails',
            'thanks' => 'Vielen Dank,',
            'unspecified' => 'Nicht angegeben',
            'empty' => 'Keine Konfigurationsdetails gefunden.',
            'type' => 'Typ',
            'insulated' => 'Isoliert',
        ],
        'fr' => [
            'title' => 'Nouvelle demande reçue',
            'customer' => 'Client',
            'email' => 'E-mail',
            'phone' => 'Téléphone',
            'address' => 'Adresse',
            'product' => 'Produit',
            'total' => 'Prix total',
            'details' => 'Détails de la configuration',
            'thanks' => 'Merci,',
            'unspecified' => 'Non renseigné',
            'empty' => 'Aucun détail de configuration disponible.',
            'type' => 'Type',
            'insulated' => 'Isolé',
        ],
        'es' => [
            'title' => 'Nueva solicitud recibida',
            'customer' => 'Cliente',
            'email' => 'Correo electrónico',
            'phone' => 'Teléfono',
            'address' => 'Dirección',
            'product' => 'Producto',
            'total' => 'Precio total',
            'details' => 'Detalles de la configuración',
            'thanks' => 'Gracias,',
            'unspecified' => 'No especificado',
            'empty' => 'No hay detalles de configuración disponibles.',
            'type' => 'Tipo',
            'insulated' => 'Aislado',
        ],
    ][$locale];

    $readJson = static function ($path) {
        if (!is_file($path)) {
            throw new \RuntimeException(
                "Missing email translation file: {$path}"
            );
        }

        return json_decode(
            file_get_contents($path),
            true,
            512,
            JSON_THROW_ON_ERROR
        );
    };

    $summaryFile = $readJson(
        resource_path("js/configurator/{$locale}/summary.json")
    );

    $general = $readJson(
        resource_path("js/configurator/{$locale}/general.json")
    );

    $summary = $summaryFile['summary'] ?? [];
    $labels = $summary['labels'] ?? [];
    $values = $summary['values'] ?? [];
    $groups = $summary['groups'] ?? [];

    $normalize = static function ($key) {
        $key = preg_replace(
            '/([A-Z]+)([A-Z][a-z])/',
            '$1_$2',
            (string) $key
        );

        $key = preg_replace(
            '/([a-z0-9])([A-Z])/',
            '$1_$2',
            $key
        );

        return strtolower(
            str_replace(['-', ' '], '_', $key)
        );
    };

    $decode = static function ($value) {
        for ($i = 0; $i < 3 && is_string($value); $i++) {
            $decoded = json_decode($value, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                break;
            }

            $value = $decoded;
        }

        return $value;
    };

    $options = $decode(
        $order->configuration->config_options
    );

    $labelFor = static function ($key) use (
        $normalize,
        $labels,
        $groups,
        $copy,
        $summary
    ) {
        $key = $normalize($key);

        return $labels[$key]
            ?? $groups[$key]
            ?? $copy[$key]
            ?? ($key === 'accessories'
                ? ($summary['accessories'] ?? $key)
                : ucwords(str_replace('_', ' ', $key)));
    };

    $formatValue = static function ($field, $value) use (
        $normalize,
        $values,
        $copy
    ) {
        if ($value === null || $value === '') {
            return $copy['unspecified'];
        }

        $field = $normalize($field);

        $lookup = is_bool($value)
            ? ($value ? 'true' : 'false')
            : $normalize($value);

        if (isset($values[$field][$lookup])) {
            return $values[$field][$lookup];
        }

        if (is_bool($value)) {
            return $values['boolean'][$lookup] ?? $lookup;
        }

        return (string) $value;
    };

    // These options may appear outside an "accessories" object.
    $accessoryKeys = [
        'accessories',
        'accessory_quantities',
        'drive_over_plate',
        'drive_plate',
        'hand_transmitters',
        'hand_transmitter_qty',
        'hand_transmitter_count',
        'panic_features',
        'door_closer',
        'kaba_upgrade',
        'motor',
        'assembly_kit',
        'upgrade_kit',
        'stainless_tracks',
        'quickwall_hooks',
        'base_plate',
        'fixed_panel_left',
        'fixed_panel_right',
        'fixed_panel_top',
    ];

    $isUnselected = static function ($value) use ($normalize) {
        if (
            $value === null ||
            $value === false ||
            $value === '' ||
            $value === [] ||
            $value === 0 ||
            $value === 0.0 ||
            $value === '0'
        ) {
            return true;
        }

        return is_string($value)
            && in_array(
                $normalize($value),
                ['none', 'without', 'false', 'null'],
                true
            );
    };

    $rows = [];

    $walk = function (
        $data,
        $parents = [],
        $inAccessories = false,
        $valueContext = null
    ) use (
        &$walk,
        &$rows,
        $normalize,
        $decode,
        $labelFor,
        $formatValue,
        $accessoryKeys,
        $isUnselected
    ) {
        foreach ($data as $key => $entry) {
            if (
                is_array($entry) &&
                array_key_exists('label', $entry) &&
                array_key_exists('value', $entry)
            ) {
                $field = $normalize(
                    $entry['key'] ?? $entry['label']
                );

                $value = $entry['value'];
            } else {
                $field = $normalize($key);
                $value = $entry;
            }

            $value = $decode($value);

            $isAccessory = $inAccessories
                || in_array($field, $accessoryKeys, true);

            // Internal accessory calculation fields.
            if (
                $isAccessory &&
                in_array($field, ['unit', 'value', 'price'], true)
            ) {
                continue;
            }

            // Omit glazing groups with no selected glazing type.
            if (
                $isAccessory &&
                in_array($field, ['windows', 'stripe'], true) &&
                is_array($value)
            ) {
                $amountKey = $field === 'windows'
                    ? 'quantity'
                    : 'length';

                if (
                    $isUnselected($value['type'] ?? null) ||
                    (float) ($value[$amountKey] ?? 0) <= 0
                ) {
                    continue;
                }
            }

            if ($isAccessory && $isUnselected($value)) {
                continue;
            }

            $path = array_merge(
                $parents,
                [$labelFor($field)]
            );

            if (is_array($value)) {
                if (array_is_list($value)) {
                    foreach ($value as $index => $item) {
                        if (is_array($item)) {
                            $walk(
                                [$index => $item],
                                $path,
                                $isAccessory,
                                $field
                            );
                        } elseif (!$isAccessory || !$isUnselected($item)) {
                            $rows[] = [
                                'label' => implode(' / ', $path),
                                'value' => $formatValue($field, $item),
                            ];
                        }
                    }
                } else {
                    $walk(
                        $value,
                        $path,
                        $isAccessory,
                        $field
                    );
                }

                continue;
            }

            $translationField = $field === 'type'
                ? ($valueContext ?? $field)
                : $field;

            $rows[] = [
                'label' => implode(' / ', $path),
                'value' => $formatValue(
                    $translationField,
                    $value
                ),
            ];
        }
    };

    if (is_array($options)) {
        $walk($options);
    }

    $product = $order->configuration->product;

    $productName = $general['products'][$product->translation_key]
        ?? $product->name;

    $numberLocale = [
        'en' => 'en-IE',
        'de' => 'de-DE',
        'fr' => 'fr-FR',
        'es' => 'es-ES',
    ][$locale];

    $priceFormatter = new \NumberFormatter(
        $numberLocale,
        \NumberFormatter::CURRENCY
    );

    $totalPrice = $priceFormatter->formatCurrency(
        (float) $order->configuration->total_price,
        'EUR'
    );
@endphp

@component('mail::message')
# {{ $copy['title'] }}

**{{ $copy['customer'] }}:** {{ $order->customer_name }}  
**{{ $copy['email'] }}:** {{ $order->email }}  
**{{ $copy['phone'] }}:** {{ $order->phone }}  
**{{ $copy['address'] }}:** {{ $order->address }}

**{{ $copy['product'] }}:** {{ $productName }}  
**{{ $copy['total'] }}:** {{ $totalPrice }}

---

## {{ $copy['details'] }}

@forelse ($rows as $row)
**{{ $row['label'] }}:** {{ $row['value'] }}

@empty
{{ $copy['empty'] }}
@endforelse

---

{{ $copy['thanks'] }}  
{{ config('app.name') }}
@endcomponent