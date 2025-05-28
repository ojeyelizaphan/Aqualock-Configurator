<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    /** @use HasFactory<\Database\Factories\ProductTypeFactory> */
    use HasFactory;


    protected $fillable = ['name', 'description'];

    public function configurationSteps()
    {
        return $this->hasMany(ConfigurationStep::class)->orderBy('order');
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    
}
