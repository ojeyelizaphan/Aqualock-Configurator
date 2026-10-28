@component('mail::message')
# New Order Submitted

**Customer:** {{ $order->customer_name }}  
**Email:** {{ $order->email }}  
**Phone:** {{ $order->phone }}  
**Address:** {{ $order->address }}

**Product:** {{ $order->configuration->product->name }}  
**Total Price:** €{{ number_format($order->configuration->total_price, 2) }}

---

@php
    $options = $order->configuration->config_options;

    // Handle arrays, JSON strings, and older double-encoded JSON.
    for ($attempt = 0; $attempt < 3 && is_string($options); $attempt++) {
        $decoded = json_decode($options, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            break;
        }

        $options = $decoded;
    }

    $translationPath = resource_path('configurator/en/summary.json');

    $translations = is_file($translationPath)
        ? json_decode(file_get_contents($translationPath), true)
        : [];

    $summary = $translations['summary'] ?? [];
    $labels = $summary['labels'] ?? [];
    $valueLabels = $summary['values'] ?? [];

    // Match camelCase, snake_case and hyphenated keys.
    $normalize = static function ($key) {
        $key = (string) $key;

        $key = preg_replace('/([A-Z]+)([A-Z][a-z])/', '$1_$2', $key);
        $key = preg_replace('/([a-z0-9])([A-Z])/', '$1_$2', $key);

        return strtolower(str_replace(['-', ' '], '_', $key));
    };

    $labelFor = static function ($key) use ($normalize, $labels) {
        $normalized = $normalize($key);

        return $labels[$key]
            ?? $labels[$normalized]
            ?? ucfirst(str_replace('_', ' ', $normalized));
    };

    $formatValue = static function ($key, $value) use ($normalize, $valueLabels) {
        $field = $normalize($key);

        if ($value === null || $value === '') {
            return 'Not specified';
        }

        $lookup = is_bool($value)
            ? ($value ? 'true' : 'false')
            : $normalize($value);

        if (isset($valueLabels[$field][$lookup])) {
            return $valueLabels[$field][$lookup];
        }

        if (is_bool($value)) {
            return $value ? 'Yes' : 'No';
        }

        // Preserve numbers and unknown option codes.
        return (string) $value;
    };

    $rows = [];

    $walk = function ($data, $parents = []) use (
        &$walk,
        &$rows,
        $normalize,
        $labelFor,
        $formatValue
    ) {
        foreach ($data as $key => $entry) {
            // Support existing {label, value} entries.
            if (
                is_array($entry)
                && array_key_exists('label', $entry)
                && array_key_exists('value', $entry)
            ) {
                $field = $entry['key'] ?? $entry['label'];
                $label = $labelFor($entry['label']);
                $value = $entry['value'];
            } else {
                $field = $key;
                $label = is_int($key)
                    ? 'Item ' . ($key + 1)
                    : $labelFor($key);
                $value = $entry;
            }

            $path = array_merge($parents, [$label]);

            // Decode nested JSON objects/arrays, including accessories.
            if (is_string($value)) {
                $decoded = json_decode($value, true);

                if (is_array($decoded)) {
                    $value = $decoded;
                }
            }

            if (is_array($value) && $value !== []) {
                $walk($value, $path);
                continue;
            }

            $rows[] = [
                'label' => implode(' / ', $path),
                'value' => $value === []
                    ? 'None selected'
                    : $formatValue($field, $value),
            ];
        }
    };

    if (is_array($options)) {
        $walk($options);
    }
@endphp

## Configuration Details

@if (count($rows))
@foreach ($rows as $row)
**{{ $row['label'] }}:** {{ $row['value'] }}

@endforeach
@else
No configuration details found.
@endif

---

Thanks,  
{{ config('app.name') }}
@endcomponent
