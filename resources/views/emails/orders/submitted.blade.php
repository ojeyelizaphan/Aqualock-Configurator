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
    $options = is_string($order->configuration->config_options)
        ? json_decode($order->configuration->config_options, true)
        : $order->configuration->config_options;
@endphp

@if (is_array($options))
    @foreach ($options as $option)
        @if (is_array($option) && isset($option['label']))
- **{{ $option['label'] }}:** 
    @if (is_array($option['value']))
        {{ json_encode($option['value']) }}
    @else
        {{ $option['value'] }}
    @endif
        @else
- {{ is_scalar($option) ? $option : json_encode($option) }}
        @endif
    @endforeach
@else
No configuration details found.
@endif

---

## Accessories

@php
    $accessoriesRaw = collect($options)->firstWhere('label', 'Accessories')['value'] ?? [];

    if (!function_exists('flattenAccessories')) {
        function flattenAccessories($data, $prefix = '') {
            $lines = [];
            foreach ($data as $key => $value) {
                $label = ucfirst(str_replace('_', ' ', $prefix ? "$prefix $key" : $key));
                if (is_array($value)) {
                    if (array_is_list($value)) {
                        $lines[] = "$label: " . implode(', ', array_map(fn($v) => is_array($v) ? json_encode($v) : $v, $value));
                    } else {
                        $lines = array_merge($lines, flattenAccessories($value, $label));
                    }
                } else {
                    $lines[] = "$label: $value";
                }
            }
            return $lines;
        }
    }

    $accessoryLines = flattenAccessories($accessoriesRaw);
@endphp

@if (!empty($accessoryLines))
@foreach ($accessoryLines as $line)
- {{ $line }}
@endforeach
@else
No accessories selected.
@endif

Thanks,  
{{ config('app.name') }}
@endcomponent
