<?php

namespace App\Http\Controllers\Api;

use App\VueTask;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\VueTaskResource;
use App\Traits\ApiResponse;

class VueTaskTrackerController extends Controller
{
    use ApiResponse;

    public function index(){
        return $this->success(VueTaskResource::collection(VueTask::all()),null,Response::HTTP_OK);
    }

    public function show(VueTask $task){
        return $this->success(new VueTaskResource($task),null,Response::HTTP_OK);
    }

    public function delete(VueTask $task){
        return $this->success(null,'Surprise! Task deleted successfully.',Response::HTTP_OK);
    }

}
