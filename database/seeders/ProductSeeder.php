<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductType;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $garageDoorType = ProductType::where('name', 'Garage Door')->first();
        $houseDoorType = ProductType::where('name', 'House Door')->first();
        $securityGateType = ProductType::where('name', 'Security Gate')->first();
        $quickwallType = ProductType::where('name', 'Quickwall')->first();
        $windowsType = ProductType::where('name', 'Windows')->first();
        $basementType = ProductType::where('name', 'Basement Windows and Light Wells')->first();
        $otherType= ProductType::where('name', 'Others')->first();

        $products = [
            ['name' => 'AquaLOCK® Up-and-Over Garage Door', 'description' => 'Flood-resistant up-and-over garage door', 'price' => 1500, 'product_type_id' => $garageDoorType->id],
            ['name' => 'AquaLOCK® Sectional Garage Door', 'description' => 'Flood-resistant sectional garage door', 'price' => 2000, 'product_type_id' => $otherType->id],
            ['name' => 'AquaLOCK® House Door', 'description' => 'Flood-resistant house door', 'price' => 1200, 'product_type_id' => $houseDoorType->id],
            ['name' => 'AquaLOCK® Security Gate', 'description' => 'Flood-resistant security gate', 'price' => 1800, 'product_type_id' => $securityGateType->id],
            ['name' => 'AquaLOCK® Quickwall', 'description' => 'Modular flood protection wall', 'price' => 2500, 'product_type_id' => $quickwallType->id],
            ['name' => 'AquaLOCK® Window Protector', 'description' => 'Flood-resistant protection for windows', 'price' => 800, 'product_type_id' => $windowsType->id],
            ['name' => 'AquaLOCK® Basement Flap', 'description' => 'Flood protection flap for basements and light wells', 'price' => 900, 'product_type_id' => $basementType->id],
            ['name' => 'AquaLOCK® Small Opening Shield', 'description' => 'Protection for small vulnerable openings', 'price' => 700, 'product_type_id' => $otherType->id],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['name' => $product['name']], $product);
        }
    }
    
}
