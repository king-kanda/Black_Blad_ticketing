<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user, 200);
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request -> all(),[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',

            // add email updating 
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        return response()->json($user,201);

    }


    public function update(Request $request,$id)
    {

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|string|min:8',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        $user->name = $request->get('name', $user->name);
        $user->email = $request->get('email', $user->email);
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->role_id = $request->get('role_id', $user->role_id);

        $user->save();

        return response()->json($user, 200);

    }


    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

}



