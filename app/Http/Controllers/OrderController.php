<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Configuration;

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
        // Fetch the configuration including the product
        $configuration = Configuration::with('product')
            ->where('id', $request->configuration_id)  // ✅ Ensure we only fetch the correct configuration
            ->where('user_id', auth()->id())          // ✅ Ensure it belongs to the authenticated user
            ->first(); 

        // Check if the configuration exists before rendering
        if (!$configuration) {
            return redirect()->route('configurations.index')->with('error', 'Configuration not found.');
        }

        // Human-readable labels
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

        $configOptions = json_decode($configuration->config_options, true);

        $formattedOptions = collect($configOptions)->map(function ($value, $key) use ($labels) {
            return [
                'label' => $labels[$key] ?? ucwords(str_replace('_', ' ', $key)),
                'value' => is_numeric($value) ? number_format($value, 2) : $value
            ];
        })->values()->all();


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
        ]);

        $order = Order::create([
            'user_id' => auth()->id() ?? null,
            'configuration_id' => $validated['configuration_id'],
            'customer_name' => $validated['customer_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'message' => $validated['message'] ?? '',
        ]);

        return redirect()->route('orders.index')->with('success', 'Order placed successfully.');
        // return redirect()->route('orders.confirmation', ['order_id' => $order->id]);
    }

    // public function confirmation(Request $request)
    // {
    //     $order = Order::with(['configuration.product'])->find($request->order_id);

    //     if (!$order) {
    //         return redirect()->route('orders.index')->with('error', 'Order not found.');
    //     }

    //     return Inertia::render('Orders/Confirmation', [
    //         'order' => $order
    //     ]);
    // }




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
