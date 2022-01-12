<?php

namespace App;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded=[];
    public static function boot() {

	    parent::boot();

	    static::created(function($item) {
	        $item->update(['sort_order'=>$item->id]);
	    });



    }

    public function getCreatedAtAttribute($value){
        return date('jS, F Y.',strtotime($value));
    }

    public function getCompletedAtAttribute($value){

        return  $value ? date('jS, F Y H:i A.',strtotime($value)) : null;
    }


}
