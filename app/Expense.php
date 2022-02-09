<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $guarded= [];

    public function getDateAttribute($date){
        return date("Y-m-d",strtotime($date));
    }

    public function getAmountAttribute($amount){
        return (int)$amount;
    }
}
