<?php

use App\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $main_setting = Setting::create([
            'param'=>'allow_duplicates',
            'value'=>0
        ]);
    }
}
