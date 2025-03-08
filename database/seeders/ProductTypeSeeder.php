<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductType;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $productTypes = [
            ['name' => 'Garage Door', 'description' => 'Flood-resistant garage doors'],
            ['name' => 'House Door', 'description' => 'Flood-resistant house doors'],
            ['name' => 'Security Gate', 'description' => 'Flood-resistant security gates'],
            ['name' => 'Quickwall', 'description' => 'Modular flood protection walls'],
            ['name' => 'Windows', 'description' => 'Flood-resistant window protection'],
            ['name' => 'Basement Windows and Light Wells', 'description' => 'Protection for basements and light wells'],
            ['name' => 'Others', 'description' => 'Protection for other products that do not fit a type'],
        ];

        foreach ($productTypes as $type) {
            ProductType::updateOrCreate(['name' => $type['name']], $type);
        }
    }
}
