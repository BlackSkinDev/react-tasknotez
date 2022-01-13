<?php

namespace App\Http\Controllers\Api;

use App\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;

class SettingsController extends Controller
{
    use ApiResponse;
    public function toggleSettings(){

        $setting = Setting::where('param','allow_duplicates')->first();

        // if no settings
        if(!$setting){
            $setting = new Setting;
            $setting->param = 'allow_duplicates';
            $setting->value = 1;
            $setting->save();
            return $this->success(1,'Allowed Duplicate setting has been turned on',Response::HTTP_OK);
        }

        // if setting is on, set to off
        if($setting->value){
             $setting->value = 0;
            $setting->save();
            return $this->success(0,'Allowed Duplicate setting has been turned off',Response::HTTP_OK);
        }

        //
        $setting->value =1;
        $setting->save();
        return $this->success(1,'Allowed Duplicate setting has been turned on',Response::HTTP_OK);

    }

    public function getStatus(){
        $setting = Setting::where('param','allow_duplicates')->first();

        // if no settings
        if(!$setting){
            return $this->success(1,null,Response::HTTP_OK);
        }
        return $this->success($setting->value,null,Response::HTTP_OK);


    }
}
