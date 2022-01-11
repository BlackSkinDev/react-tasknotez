<?php

namespace App\Http\Requests;

use Illuminate\Http\Response;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class EditTaskFormRequest extends FormRequest
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
            'label'=>'required|string',
        ];
    }

    protected function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json([
            'status' => 'error',
            'msg' => null,
            'data'=>$validator->errors()->all()],Response::HTTP_BAD_REQUEST
        ));
    }
}
