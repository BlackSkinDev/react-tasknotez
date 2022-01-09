<?php
namespace App\Services;

use App\Task;
use App\Setting;


class TaskService{


    public function checkDuplicateSettingsWhileCreating($label){

        // check if allow dupilicate is turned off
        // check if label does not exist

        $setting = Setting::where('param','allow_duplicates')->where('value',0)->count();
        if($setting){
            if(Task::where('label',$label)->count()){
                return true;
            }
        }
        return false;
    }


    public function checkDuplicateSettingsWhileUpdating($label,$task){

        // check if allow dupilicate is turned off
        // check if label does not exist, current task can retain it's label

        $setting = Setting::where('param','allow_duplicates')->where('value',0)->count();
        if($setting){
            if(Task::where('label',$label)->where('id','!=',$task->id)->count()){
                return true;
            }
        }
        return false;
    }
}




?>
