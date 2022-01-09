<?php

namespace App\Http\Controllers\Api;

use App\Task;
use App\Setting;
use Carbon\Carbon;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Http\Requests\EditTaskFormRequest;
use App\Http\Requests\AddNewTaskFormRequest;

class TaskController extends Controller
{

    use ApiResponse;

    public $task_service;

    public function __construct(){
        $this->task_service = new TaskService;
    }

    public function index()
    {
        $tasks = Task::all();
        return $this->success($tasks,null,Response::HTTP_OK);
    }


    public function store(AddNewTaskFormRequest $request)
    {
        // check if  allow duplicate setting is turned on while trying to store
        if($this->task_service->checkDuplicateSettingsWhileCreating($request['label'])){
            return $this->error('A task with same label already exists',Response::HTTP_BAD_REQUEST,null);
        }
        Task::create($request->validated());
        return $this->success(null,'Task created successfully',Response::HTTP_CREATED);

    }


    public function show(Task $task)
    {
        return $this->success($task,null,Response::HTTP_OK);
    }


    public function update(EditTaskFormRequest $request, Task $task)
    {

        // check if  allow duplicate setting is turned on while trying to update
        if($this->task_service->checkDuplicateSettingsWhileUpdating($request['label'],$task)){
            return $this->error('A task with same label already exists',Response::HTTP_BAD_REQUEST,null);
        }
        $task->update($request->validated());
        return $this->success(null,'Task Updated successfully',Response::HTTP_OK);
    }

    public function setTaskAsCompleted(Task $task)
    {
        $task->update(['completed_at'=>Carbon::now()->toDateTimeString()]);
        return $this->success(null,'Task set as completed successfully',Response::HTTP_OK);
    }

    public function setTaskAsInComplete(Task $task)
    {
        $task->update(['completed_at'=>null]);
        return $this->success(null,'Task set as Incomplete successfully',Response::HTTP_OK);
    }


}
