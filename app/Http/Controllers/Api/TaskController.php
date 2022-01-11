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
        $tasks = Task::orderBy('sort_order','asc')->get();
        return $this->success(TaskResource::collection($tasks),null,Response::HTTP_OK);
    }


    public function store(AddNewTaskFormRequest $request)
    {
        // check if  allow duplicate setting is turned on while trying to store
        if($this->task_service->checkDuplicateSettingsWhileCreating($request['label'])){
            return $this->error(null,Response::HTTP_BAD_REQUEST,['Duplicate task label is not allowed currently']);
        }

        $last_sort_order = (Task::latest()->first()) ? (Task::latest()->first()->sort_order)+1 : 1;
        Task::create([
            'label' => $request['label'],
            'sort_order' =>$last_sort_order
        ]);
        return $this->success(null,'Task created successfully',Response::HTTP_CREATED);

    }


    public function show(Task $task)
    {
        return $this->success(new TaskResource($task),null,Response::HTTP_OK);
    }


    public function update(EditTaskFormRequest $request, Task $task)
    {

        // check if  allow duplicate setting is turned on while trying to update
        if($this->task_service->checkDuplicateSettingsWhileUpdating($request['label'],$task)){
            return $this->error(null,Response::HTTP_BAD_REQUEST,['Duplicate task label is not allowed currently']);
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
