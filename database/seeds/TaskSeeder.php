<?php


use App\Task;
use App\Setting;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $task1= Task::create([
            'label'=>'Learn Javascript',
            'sort_order'=>1,
            'created_at'=>'2021-12-15 11:02:51',
            'updated_at'=>'2021-12-15 11:02:51',
            'completed_at'=>'2021-12-15 12:02:51',
        ]);
        $task2= Task::create([
            'label'=>'Learn Node.Js',
            'sort_order'=>2,
            'completed_at'=>'2021-12-17 12:02:51',
            'created_at'=>'2021-12-16 11:02:51',
            'updated_at'=>'2021-12-16 11:02:51',
        ]);
        $task3= Task::create([
            'label'=>'Learn Angular',
            'sort_order'=>3,
            'created_at'=>'2021-12-17 11:02:51',
            'updated_at'=>'2021-12-17 11:02:51',
        ]);
    }
}
