<?php

namespace Database\Seeders;

use App\VueTask;
use Illuminate\Database\Seeder;

class VueTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $task1= VueTask::create([
            'text'=>'Learn Javascript',
            'day'=>'Monday, 19th of February 2022',
            'reminder'=>true,
         ]);

         $task1= VueTask::create([
            'text'=>'Buy 4k Monitor',
            'day'=>'Monday, 23rd of February 2022',
            'reminder'=>true,
         ]);

         $task1= VueTask::create([
            'text'=>'Buy Iphone 11',
            'day'=>'Monday, 29th of February 2022',
            'reminder'=>false,
         ]);

    }
}
