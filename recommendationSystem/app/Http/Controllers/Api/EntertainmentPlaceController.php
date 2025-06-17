<?php
   namespace App\Http\Controllers\Api;

   use App\Http\Controllers\Controller;
   use App\Models\EntertainmentPlace;
   use Illuminate\Http\Request;
   use Illuminate\Support\Facades\DB;

   class EntertainmentPlaceController extends Controller
   {
       public function __construct()
       {
           $this->middleware('auth:sanctum');
           $this->middleware('admin')->only(['store', 'update', 'destroy']);    
       }

       public function index()
       {
           $entertainmentPlaces = EntertainmentPlace::with('city')->get();
           return response()->json($entertainmentPlaces, 200);
       }

    //    public function store(Request $request)
    //    {
    //        $request->validate([
    //            'places' => 'required|array',
    //            'places.*.city_id' => 'required|exists:cities,id',
    //            'places.*.Landmark_name' => 'required|string|max:255',
    //            'places.*.Land_photo_1' => 'nullable|url',
    //            'places.*.Land_photo_2' => 'nullable|url',
    //            'places.*.Land_photo_3' => 'nullable|url',
    //            'places.*.Land_photo_4' => 'nullable|url',
    //            'places.*.Rating' => 'nullable|numeric|min:0|max:5',
    //            'places.*.Ticket-price' => 'nullable|numeric|min:0',
    //            'places.*.Category' => 'required|in:Archaeological,Entertainment,Religious',
    //        ]);

    //        $places = $request->input('places');
    //        $createdPlaces = [];

    //        DB::beginTransaction();
    //        try {
    //            foreach ($places as $place) {
    //                $entertainmentPlace = EntertainmentPlace::create([
    //                    'city_id' => $place['city_id'],
    //                    'Landmark_name' => $place['Landmark_name'],
    //                    'Land_photo_1' => $place['Land_photo_1'] ?? null,
    //                    'Land_photo_2' => $place['Land_photo_2'] ?? null,
    //                    'Land_photo_3' => $place['Land_photo_3'] ?? null,
    //                    'Land_photo_4' => $place['Land_photo_4'] ?? null,
    //                    'Rating' => $place['Rating'] ?? null,
    //                    'Ticket-price' => $place['Ticket-price'] ?? null,
    //                    'Category' => $place['Category'],
    //                ]);
    //                $createdPlaces[] = $entertainmentPlace;
    //            }
    //            DB::commit();
    //            return response()->json(['message' => 'Entertainment Places created successfully', 'data' => $createdPlaces], 201);
    //        } catch (\Exception $e) {
    //            DB::rollBack();
    //            return response()->json(['message' => 'Failed to create entertainment places', 'error' => $e->getMessage()], 500);
    //        }
    //    }

    public function store(Request $request)
{
    $request->validate([
        'places' => 'required|array',
        'places.*.city_id' => 'required|exists:cities,id',
        'places.*.Landmark_name' => 'required|string|max:255',
        'places.*.Land_photo_1' => [
            'nullable',
            function ($attribute, $value, $fail) {
                // Check if the value is a valid URL
                if (filter_var($value, FILTER_VALIDATE_URL)) {
                    return true;
                }
                // Check if the value is a base64-encoded image (e.g., starts with "data:image/")
                if (preg_match('/^data:image\/[a-z]+;base64,/', $value)) {
                    // Optionally, validate the base64 string further
                    $base64String = explode(',', $value)[1] ?? '';
                    if (base64_decode($base64String, true) !== false) {
                        return true;
                    }
                    $fail("$attribute is not a valid base64-encoded image.");
                }
                $fail("$attribute must be a valid URL or base64-encoded image.");
            },
        ],
        'places.*.Land_photo_2' => 'nullable|url',
        'places.*.Land_photo_3' => 'nullable|url',
        'places.*.Land_photo_4' => 'nullable|url',
        'places.*.Rating' => 'nullable|numeric|min:0|max:5',
        'places.*.Ticket-price' => 'nullable|numeric|min:0',
        'places.*.Category' => 'required|in:Archaeological,Entertainment,Religious',
    ]);

    $places = $request->input('places');
    $createdPlaces = [];

    DB::beginTransaction();
    try {
        foreach ($places as $place) {
            $entertainmentPlace = EntertainmentPlace::create([
                'city_id' => $place['city_id'],
                'Landmark_name' => $place['Landmark_name'],
                'Land_photo_1' => $place['Land_photo_1'] ?? null,
                'Land_photo_2' => $place['Land_photo_2'] ?? null,
                'Land_photo_3' => $place['Land_photo_3'] ?? null,
                'Land_photo_4' => $place['Land_photo_4'] ?? null,
                'Rating' => $place['Rating'] ?? null,
                'Ticket-price' => $place['Ticket-price'] ?? null,
                'Category' => $place['Category'],
            ]);
            $createdPlaces[] = $entertainmentPlace;
        }
        DB::commit();
        return response()->json(['message' => 'Entertainment Places created successfully', 'data' => $createdPlaces], 201);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Failed to create entertainment places', 'error' => $e->getMessage()], 500);
    }
}
       public function show(EntertainmentPlace $entertainmentPlace)
       {
           $entertainmentPlace->load('city');
           return response()->json($entertainmentPlace, 200);
       }

       public function update(Request $request, EntertainmentPlace $entertainmentPlace)
       {
           $request->validate([
               'city_id' => 'required|exists:cities,id',
               'Landmark_name' => 'required|string|max:255',
               'Land_photo_1' => 'nullable|url',
               'Land_photo_2' => 'nullable|url',
               'Land_photo_3' => 'nullable|url',
               'Land_photo_4' => 'nullable|url',
               'Rating' => 'nullable|numeric|min:0|max:5',
               'Ticket-price' => 'nullable|numeric|min:0',
               'Category' => 'required|in:Archaeological,Entertainment,Religious',
           ]);

           $entertainmentPlace->update($request->only([
               'city_id', 'Landmark_name', 'Land_photo_1', 'Land_photo_2',
               'Land_photo_3', 'Land_photo_4', 'Rating', 'Ticket-price', 'Category'
           ]));

           return response()->json(['message' => 'Entertainment Place updated successfully', 'data' => $entertainmentPlace], 200);
       }

       public function destroy(EntertainmentPlace $entertainmentPlace)
       {
           $entertainmentPlace->delete();
           return response()->json(['message' => 'Entertainment Place deleted successfully'], 200);
       }
   }