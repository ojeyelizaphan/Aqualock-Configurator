<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Http\Requests\StoreConfigurationRequest;
use App\Http\Requests\UpdateConfigurationRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $configurations = Configuration::with('product')->where('user_id', auth()->id())->get();
        return Inertia::render('Configurations/Index', ['configurations' => $configurations]);
    }

    /**
     * Show the form for creating a new resource.
     */
    // public function create() : Response
    // {
    //     return Inertia::render('Configurations/Create', [
    //         'products' => Product::all(), // Pass products for selection
    //         'authUser' => Auth::user(), // ✅ Pass authenticated user
    //     ]);
    // }

    public function create()
    {

        $products = Product::with(['productType.configurationSteps'])->get();

        // logger($products->toArray());

        return Inertia::render('Configurations/ConfigurationWizard', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConfigurationRequest $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'config_options' => 'required|array',
                'total_price' => 'required|numeric',
            ]);

            $configuration = Configuration::create([
                'user_id' => auth()->id(),
                'product_id' => $validated['product_id'],
                'config_options' => json_encode($validated['config_options']),
                'total_price' => $validated['total_price'],
            ]);

            return redirect()->route('orders.create', ['configuration_id' => $configuration->id]);
        } catch (\Exception $e) {
            \Log::error('Failed to save configuration:', ['error' => $e->getMessage()]);
            return back()->withErrors('Failed to save configuration. Please try again.');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        $configuration->load('product');

        return Inertia::render('Configurations/Show', ['configuration' => $configuration]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Configuration $configuration)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConfigurationRequest $request, Configuration $configuration)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Configuration $configuration)
    {
        //
    }
}
