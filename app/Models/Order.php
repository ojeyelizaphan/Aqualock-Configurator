<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'configuration_id',
        'customer_name',
        'email',
        'phone',
        'address',
        'message',
    ];

    // ✅ An order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // ✅ An order belongs to a configuration
    public function configuration()
    {
        return $this->belongsTo(Configuration::class);
    }
}
