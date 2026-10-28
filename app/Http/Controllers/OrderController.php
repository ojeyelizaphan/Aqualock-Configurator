<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Configuration;
use App\Mail\OrderSubmitted;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['configuration.product'])->where('user_id', auth()->id())->get();
        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $configuration = Configuration::with('product')
            ->where('id', $request->configuration_id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$configuration) {
            return redirect()->route('configurations.index')->with('error', 'Configuration not found.');
        }

        $labels = [
            'protection_height' => 'Protection Height',
            'protection_height_cost' => 'Protection Height Cost (€)',
            'width' => 'Width (mm)',
            'height' => 'Height (mm)',
            'size_cost' => 'Size Cost (€)',
            'installation_type' => 'Installation Type',
            'color' => 'Color',
            'color_cost' => 'Color Cost (€)',
            'material' => 'Material',
            'material_cost' => 'Material Cost (€)',
            'insulation' => 'Insulation',
            'insulation_cost' => 'Insulation Cost (€)',
            'hand_transmitter_count' => 'Number of Hand Transmitters',
            'transmitter_cost' => 'Transmitter Cost (€)',
        ];

        $configOptions = $configuration->config_options ?? [];

        for ($attempt = 0; $attempt < 3 && is_string($configOptions); $attempt++) {
            $decoded = json_decode($configOptions, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                break;
            }

            $configOptions = $decoded;
        }

        $configOptions = is_array($configOptions) ? $configOptions : [];

        $formattedOptions = collect($configOptions)
            ->map(function ($value, $key) use ($labels) {
                $normalizedKey = preg_replace(
                    '/([A-Z]+)([A-Z][a-z])/',
                    '$1_$2',
                    (string) $key
                );

                $normalizedKey = preg_replace(
                    '/([a-z0-9])([A-Z])/',
                    '$1_$2',
                    $normalizedKey
                );

                $normalizedKey = strtolower(
                    str_replace(['-', ' '], '_', $normalizedKey)
                );

                return [
                    'key' => $key,
                    'label' => $labels[$normalizedKey]
                        ?? ucwords(str_replace('_', ' ', $normalizedKey)),
                    'value' => $value,
                ];
            })
            ->values()
            ->all();

        return Inertia::render('Orders/Create', [
            'configuration' => $configuration,
            'config_options' => $formattedOptions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        $validated = $request->validate([
            'configuration_id' => 'required|exists:configurations,id',
            'customer_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address' => 'required|string',
            'message' => 'nullable|string',
            'accessories_summary' => 'sometimes|array',
            'locale' => 'required|in:de,en,fr,es',
        ]);

        $order = Order::create([
            'user_id' => auth()->id(),
            'configuration_id' => $validated['configuration_id'],
            'customer_name' => $validated['customer_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'message' => $validated['message'] ?? '',
        ]);

        $recipient = $validated['locale'] === 'fr'
            ? 'info@aqualock.fr'
            : 'angebot@torbau-schwaben.de';

        Mail::to($recipient)->send(new OrderSubmitted($order));

        return redirect()->back()->with('success', true);
    }



    public function confirmation()
    {
        return Inertia::render('Orders/OrderConfirmation');
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('configuration.product'); 
        
        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
