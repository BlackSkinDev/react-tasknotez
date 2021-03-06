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

    public function __construct(TaskService $task_service){
        $this->task_service = $task_service;
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


        Task::create([
            'label' => $request['label'],
        ]);

        return $this->success(null,'Task created successfully',Response::HTTP_CREATED);

    }

    public function destroy(Task $task){
        $task->delete();
        return $this->success(null,'Task deleted successfully',Response::HTTP_CREATED);
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

    public function swapSortOrder(Task $task1,Task $task2){
        $old_sort_id = ['task1'=>$task1->sort_order,'task2'=>$task2->sort_order];
        $task1->update(['sort_order'=>$old_sort_id['task2']]);
        $task2->update(['sort_order'=>$old_sort_id['task1']]);
        return $this->success(null,null,Response::HTTP_OK);


    }

    public function updateSortOrders(Request $request){
        $tasks = $request->updatedTasks;
         foreach ($tasks as $task_obj) {
             $task_id = $task_obj['id'];
             $task_sort_order = $task_obj['sort_order'];
             Task::where('id', '=', $task_id)->first()->update(['sort_order'=> $task_sort_order]);
         }
        return $this->success(null,null,Response::HTTP_OK);


    }


}
