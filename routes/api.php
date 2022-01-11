<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register APIroutes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::namespace('Api')->group(function () {
    Route::resource('/tasks',TaskController::class);

    // Route set Incomplete task as complete
    Route::get('/tasks/{task}/set',[App\Http\Controllers\Api\TaskController::class,'setTaskAsCompleted']);

     // Route set Complete task as incomplete
    Route::get('/tasks/{task}/unset',[App\Http\Controllers\Api\TaskController::class,'setTaskAsInComplete']);

      // Route to swap sort order when task are rearranged
      Route::get('/tasks/{task1}/{task2}/swap-sort-order',[App\Http\Controllers\Api\TaskController::class,'swapSortOrder']);
});

