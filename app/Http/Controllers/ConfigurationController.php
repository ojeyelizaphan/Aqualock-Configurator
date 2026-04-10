<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use App\Http\Requests\StoreConfigurationRequest;
use App\Http\Requests\UpdateConfigurationRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    public function index()
    {
        $configurations = Configuration::with('product')
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Configurations/Index', [
            'configurations' => $configurations
        ]);
    }

    public function create()
    {
        $products = Product::with(['productType.configurationSteps'])->get();

        return Inertia::render('Configurations/ConfigurationWizard', [
            'products' => $products,
            'existingConfiguration' => null,
        ]);
    }

    public function store(StoreConfigurationRequest $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'config_options' => 'required|array',
                'total_price' => 'required|numeric',
                'current_step' => 'nullable|integer|min:1',
            ]);

            $configuration = Configuration::create([
                'user_id' => auth()->id() ?? null,
                'product_id' => $validated['product_id'],
                'config_options' => $validated['config_options'],
                'total_price' => $validated['total_price'],
                'current_step' => $validated['current_step'] ?? 1,
            ]);

            return redirect()->route('orders.create', [
                'configuration_id' => $configuration->id
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to save configuration:', [
                'error' => $e->getMessage()
            ]);

            return back()->withErrors('Failed to save configuration. Please try again.');
        }
    }

    public function show(Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        $configuration->load('product.productType.configurationSteps');

        return Inertia::render('Configurations/Show', [
            'configuration' => $configuration
        ]);
    }

    public function edit(Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        $products = Product::with(['productType.configurationSteps'])->get();
        $configuration->load('product.productType.configurationSteps');

        return Inertia::render('Configurations/ConfigurationWizard', [
            'products' => $products,
            'existingConfiguration' => $configuration,
        ]);
    }

    public function update(UpdateConfigurationRequest $request, Configuration $configuration)
    {
        if ($configuration->user_id !== auth()->id()) {
            abort(403);
        }

        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'config_options' => 'required|array',
                'total_price' => 'required|numeric',
                'current_step' => 'nullable|integer|min:1',
            ]);

            $configuration->update([
                'product_id' => $validated['product_id'],
                'config_options' => $validated['config_options'],
                'total_price' => $validated['total_price'],
                'current_step' => $validated['current_step'] ?? $configuration->current_step,
            ]);

            return redirect()->route('orders.create', [
                'configuration_id' => $configuration->id
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update configuration:', [
                'error' => $e->getMessage()
            ]);

            return back()->withErrors('Failed to update configuration. Please try again.');
        }
    }

    public function destroy(Configuration $configuration)
    {
        //
    }
}