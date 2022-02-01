<?php

namespace App\Http\Controllers\Api;
use App\User;

use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\ExpenseTrackerLoginFormRequest;
use App\Http\Requests\ExpenseTrackerRegisterFormRequest;

class ExpenseTrackerController extends Controller
{
    use ApiResponse;

    public function register(ExpenseTrackerRegisterFormRequest $request){
       User::create([
           'username' => $request->username,
           'password' => Hash::make($request->password),
           'email' => $request->email
       ]);
       return $this->success(null,'Hurray! Registration successful.',Response::HTTP_OK);
    }

    public function login(ExpenseTrackerLoginFormRequest $request){
        if (!Auth::attempt($request->all())) {
            return $this->error("Incorrect email or password", Response::HTTP_UNAUTHORIZED);
        }
        return $this->success(
            ['token' => auth()->user()->createToken('API Token')->plainTextToken]
            ,'Login success',
            Response::HTTP_OK
        );

    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->success(null,'Logout success',Response::HTTP_OK);
    }

}
