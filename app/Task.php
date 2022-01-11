<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $guarded=[];

    public function getCreatedAtAttribute($value){
        return date('jS, F Y.',strtotime($value));
    }

    public function getCompletedAtAttribute($value){

        return  $value ? date('jS, F Y H:i A.',strtotime($value)) : null;
    }


}
