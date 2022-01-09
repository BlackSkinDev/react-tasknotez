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
            'completed_at'=>'2022-01-09 11:02:51',
        ]);
        $task2= Task::create([
            'label'=>'Learn Node.Js',
            'sort_order'=>1,
            'completed_at'=>'2022-01-09 12:02:51',
        ]);
        $task3= Task::create([
            'label'=>'Learn Javascript',
            'sort_order'=>1,
        ]);
    }
}
