<?php

namespace App\Http\Controllers;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventsController extends Controller
{
    //
    public function index()
    {
        $events = Events::all();
        return response()->json($events, 200);
    }

    public function show($id){

        $event = Events::find($id);

        if(!$event){
            return response()->json([
                'message'=>'Event not found',
                404
            ]);
        }

        return response()->json($event,200);

    }

    public function store(Request $request)
    {

        $validator = Validator::make($request -> all(),[
            'name' => 'required|string|max:255',
            'Description' => 'required|string|max:255',
            'event_date' => 'required|date',
            'start_time'=>'required|time',
            'end_time' =>'required|time',
            'image_url' => 'required|string',
            'user_id' => 'required|string',
            'location'=> 'required|string'


            // add email updating
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        $event = Events::create([
            'name' => $request->name,
            'Description' => $request->Description,
            'event_date' => $request-> event_date,
            'start_time'=> $request-> start_time,
            'end_time' =>$request-> end_time,
            'image_url' => $request-> image_url,
            'user_id' => $request-> user_id,
            'location'=>$request-> location,

        ]);


        return response()->json($event,201);

    }


    public function update(Request $request,$id)
    {

        $event = Events::find($id);

        if (!$event) {
            return response()->json(['message' => 'event not found'], 404);
        }


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:events,email,' . $id,

        ]);

        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }


        $event->name = $request->get('name', $event->name);
        $event->email = $request->get('email', $event->email);


        $event->save();

        return response()->json($event, 200);

    }


    public function destroy($id)
    {
        $event = Events::find($id);

        if (!$event) {
            return response()->json(['message' => 'event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'event deleted successfully'], 200);
    }

}





