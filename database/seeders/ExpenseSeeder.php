<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Expense;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Expense::create([
        	'user_id'=>1,
        	'label'=>'MacBook Big Sur M1 chip',
        	'amount'=>456.56,
        	'date'=>'2021-10-24'
        ]);

         Expense::create([
        	'user_id'=>1,
        	'label'=>'4K Monitor 32 Inches',
        	'amount'=>556.56,
        	'date'=>'2021-10-28'
        ]);

          Expense::create([
        	'user_id'=>1,
        	'label'=>'Bed Frame',
        	'amount'=>156.56,
        	'date'=>'2021-10-30'
        ]);
    }
}
