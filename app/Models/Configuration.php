<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    /** @use HasFactory<\Database\Factories\ConfigurationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'config_options',
        'total_price',
    ];
    protected $casts = [
        'config_options' => 'array',
    ];

    // ✅ A configuration belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // ✅ A configuration belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ✅ A configuration can have many orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
