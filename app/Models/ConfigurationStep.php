<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigurationStep extends Model
{
    /** @use HasFactory<\Database\Factories\ConfigurationStepFactory> */
    use HasFactory;

    protected $fillable = ['product_type_id', 'name', 'order'];

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }
}
