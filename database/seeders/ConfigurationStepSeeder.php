<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\ConfigurationStep;
use App\Models\ProductType;
use Illuminate\Database\Seeder;

class ConfigurationStepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $steps = [
            // Garage Doors
            'Garage Door' => [
                ['name' => 'Protection Height', 'order' => 1],
                ['name' => 'Size & Installation Type', 'order' => 2],
                ['name' => 'Color & Material', 'order' => 3],
                ['name' => 'Insulation & Hand Transmitter', 'order' => 4],
            ],
            // House Doors
            'House Door' => [
                ['name' => 'Thermal Insulation & Window', 'order' => 1],
                ['name' => 'Door Dimensions & Installation', 'order' => 2],
                ['name' => 'Locking Mechanism', 'order' => 3],
                ['name' => 'Color & Door Fittings', 'order' => 4],
            ],
            // Security Gate
            'Security Gate' => [
                ['name' => 'Opening Direction & Installation', 'order' => 1],
                ['name' => 'Flood Protection Level & Gate Size', 'order' => 2],
                ['name' => 'Color & Material, Gate Fittings', 'order' => 3],
                ['name' => 'Central Locking (Inward-Opening Only)', 'order' => 4],
            ],
            // Quickwall
            'Quickwall' => [
                ['name' => 'Protection level and Measurements', 'order' => 1],
                ['name' => 'Installation method, Locking Lever', 'order' => 2],
                ['name' => 'Multi Panel System', 'order' => 3],
                ['name' => 'Corner Profiles, Base Plate, Hanging Hooks', 'order' => 4],
            ],
            //
            // Windows
            'Windows' => [
                ['name' => 'Dimensions & Installation Method', 'order' => 1],
                ['name' => 'Hatch Options', 'order' => 2],
            ],
            // Basement Windows and Light Wells
            'Basement Windows and Light Wells' => [
                ['name' => 'Measurement & Material', 'order' => 1],
                ['name' => 'Colour, Opening Direction, Cladding.', 'order' => 2],
            ],
            // Other Smaller Openings
            'Others' => [
                ['name' => 'Door Size & Installation Method', 'order' => 1],
                ['name' => 'Base Plate', 'order' => 2],
                ['name' => 'Panel & Profile Colour', 'order' => 3],
            ],
        ];

        foreach ($steps as $productType => $stepsList) {
            $type = ProductType::where('name', $productType)->first();
            
            if ($type) {
                foreach ($stepsList as $step) {
                    ConfigurationStep::updateOrCreate([
                        'product_type_id' => $type->id,
                        'name' => $step['name']
                    ], $step);
                }
            }
        }
    }
}
