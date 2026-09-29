<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Configuration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WooCommerceConfigurationController extends Controller
{
    public function show(
        Request $request,
        string $token,
    ): JsonResponse {
        $configuredKey = (string) config(
            'services.tbs_woocommerce.integration_key'
        );

        $providedKey = (string) $request->header(
            'X-TBS-Integration-Key'
        );

        if (
            $configuredKey === '' ||
            ! hash_equals($configuredKey, $providedKey)
        ) {
            return response()->json([
                'message' => 'Unauthorised.',
            ], 401);
        }

        $configuration = Configuration::with([
            'product.productType',
        ])
            ->where(
                'handoff_token_hash',
                hash('sha256', $token),
            )
            ->first();

        if (! $configuration) {
            return response()->json([
                'message' =>
                    'Configuration not found.',
            ], 404);
        }

        if (
            ! $configuration->handoff_expires_at ||
            $configuration->handoff_expires_at->isPast()
        ) {
            return response()->json([
                'message' =>
                    'This configuration link has expired.',
            ], 410);
        }

        if ($configuration->source !== 'woocommerce') {
            return response()->json([
                'message' =>
                    'This configuration cannot be purchased.',
            ], 403);
        }

        $productName =
            $configuration->product
                ->productType?->name ?? '';

        return response()->json([
            'configuration_id' => $configuration->id,

            'product' => [
                'id' => $configuration->product_id,
                'name' => $productName,
                'slug' => Str::slug($productName),
            ],

            'config_options' =>
                $configuration->config_options,

            'pricing' => [
                'total_price' => (float)
                    $configuration->total_price,

                'net_price' => (float) data_get(
                    $configuration,
                    'pricing_breakdown.net_price',
                    0,
                ),

                'vat_amount' => (float) data_get(
                    $configuration,
                    'pricing_breakdown.vat_amount',
                    0,
                ),

                'gross_price' => (float) data_get(
                    $configuration,
                    'pricing_breakdown.gross_price',
                    $configuration->total_price,
                ),

                'vat_rate' => (float) data_get(
                    $configuration,
                    'pricing_breakdown.vat_rate',
                    0,
                ),
            ],

            'expires_at' =>
                $configuration->handoff_expires_at
                    ->toIso8601String(),
        ]);
    }
}