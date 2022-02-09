<?php

namespace Database\Seeders;

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
        	'username'=>'Chilling',
        	'email'=>'azeezafeez212@gmail.com',
        	'password'=>Hash::make('password'),

        ]);
    }
}
