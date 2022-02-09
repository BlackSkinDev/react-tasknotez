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


        Route::prefix('/expense-tracker')->group(function () {

            Route::post('/register',[App\Http\Controllers\Api\ExpenseTrackerController::class,'register']);
            Route::post('/login',[App\Http\Controllers\Api\ExpenseTrackerController::class,'login']);


            Route::middleware(['auth:sanctum'])->group(function () {
                Route::get('/expenses',[App\Http\Controllers\Api\ExpenseTrackerController::class,'getUserExpenses']);
                Route::post('/expenses',[App\Http\Controllers\Api\ExpenseTrackerController::class,'store']);
                //Route::post('/logout',[App\Http\Controllers\Api\ExpenseTrackerController::class,'logout']);
            });

        });




     // Route to get allow duplicate status
    Route::get('/setting-status',[App\Http\Controllers\Api\SettingsController::class,'getStatus']);


     // Route to toggle allow duplicate settings
    Route::get('/toggle-settings',[App\Http\Controllers\Api\SettingsController::class,'toggleSettings']);

    // Route to swap sort order when task are rearranged
    Route::put('/tasks/swap-sort-order',[App\Http\Controllers\Api\TaskController::class,'updateSortOrders']);

    Route::resource('/tasks',TaskController::class);

    // Route set Incomplete task as complete
    Route::get('/tasks/{task}/set',[App\Http\Controllers\Api\TaskController::class,'setTaskAsCompleted']);

     // Route set Complete task as incomplete
    Route::get('/tasks/{task}/unset',[App\Http\Controllers\Api\TaskController::class,'setTaskAsInComplete']);






});

