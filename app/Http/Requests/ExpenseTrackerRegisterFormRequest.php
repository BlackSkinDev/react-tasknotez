<?php

namespace App\Http\Requests;
use App\User;

use Illuminate\Http\Response;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;


class ExpenseTrackerRegisterFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username'=>['required','without_spaces' ,'string', 'max:12','regex:/^[A-Za-z0-9 ]*$/'],
            'email'=>['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => 'required|min:6|max:16|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/|confirmed',
        ];
    }

    public function messages(){
        return [
            'username.regex'=>'Display name may not contain any special character',
            'username.without_spaces'=>'Display name may not contain empty spaces',
            'password.regex'=>'Password must contain an uppercase,lowercase,number and a special character',
        ];
    }

    protected function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'message' =>null,
            'data'=>$validator->errors()->all()],Response::HTTP_BAD_REQUEST
        ));
    }
}
