<?php

namespace Tests\Unit;


use App\Task;
use SettingSeeder;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    use RefreshDatabase;
    public $faker;

    public function setUp(): void{
        parent::setUp();
        $this->faker=\Faker\Factory::create();
    }




    public function test_if_a_task_can_be_created()
    {

        $response = $this->json('POST','/api/tasks',[
            "label"=>$this->faker->text(7),
        ]);

        $response->assertJson([
            'status'=>"success",
            'message'=>'Task created successfully',
            'data' =>null
        ])->assertStatus(201);

    }

    public function test_for_validation_error_while_creating_a_task(){
        $response = $this->json('POST','/api/tasks',[
            "label"=>''
        ]);
        $response->assertStatus(400);
    }

     public function test_if_error_is_thrown_for_duplicate_task_label_if_allowed_duplicate_is_off_while_creating()
     {

        $this->seed(SettingSeeder::class);
        $task = factory(Task::class)->create();
        $response = $this->json('POST','/api/tasks',[
            "label"=>$task->label,
        ]);

        $response->assertStatus(400);

     }

     public function test_if_list_of_tasks_can_be_fetched(){
        $task = factory(Task::class,3)->create();
        $response= $this->json('GET','api/tasks');
        $response->assertStatus(200)
            ->assertJsonStructure([
                'data'=>[
                    '*'=>['id','label','sort_order','completed_at']
                ],
            ]);

     }

     public function test_if_a_task_can_be_updated(){
        $task = factory(Task::class)->create();
        $response=$this->json('PUT',"api/tasks/$task->id",[
            'label'=>$task->label. "_updated",
        ]);
        $response->assertJson([
            'status'=>"success",
            'message'=>'Task Updated successfully',
            'data' =>null
        ])->assertStatus(200);





     }

     public function test_if_error_is_thrown_for_duplicate_task_label_if_allowed_duplicate_is_off_while_updating(){

        $this->seed(SettingSeeder::class);
        $task1 = factory(Task::class)->create();
        $task2 = factory(Task::class)->create();

        $response = $this->json("PUT","/api/tasks/$task1->id",[
            "label"=>$task2->label,
        ]);

        $response->assertStatus(400);
     }



}
