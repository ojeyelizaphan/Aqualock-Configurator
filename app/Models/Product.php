<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
        'product_type_id',
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    // ✅ A product can have many configurations
    public function configurations()
    {
        return $this->hasMany(Configuration::class);
    }
    
}
