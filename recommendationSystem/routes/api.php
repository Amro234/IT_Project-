<?php
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\AuthController;
// use App\Http\Controllers\Api\CityController;
// use App\Http\Controllers\Api\UserController;
// use App\Http\Controllers\Api\HotelController;
// use App\Http\Controllers\Api\RoomTypeController;
// use App\Http\Controllers\Api\RoomController;
// use App\Http\Controllers\Api\RoomImageController;
// use App\Http\Controllers\Api\BookingController;
// use App\Http\Controllers\Api\PaymentController;
// use App\Http\Controllers\Api\ReviewController;
// use App\Http\Controllers\Api\UserPreferenceController;
// use App\Http\Controllers\Api\TransportationController;
// use App\Http\Controllers\Api\RestaurantController;
// use App\Http\Controllers\Api\EntertainmentPlaceController;
// use App\Http\Controllers\Api\RecommendationController;
// use App\Http\Controllers\Api\AiModelMetadataController;

// // Public routes for authentication
// // Route::post('/register', [AuthController::class, 'register']);
// // Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', function (Illuminate\Http\Request $request) {
//     $request->validate([
//         'name' => 'required|string|max:255',
//         'email' => 'required|email|unique:users,email',
//         'password' => 'required|string|min:8',
//         'role' => 'required|in:admin,user',
//         'date_of_birth' => 'nullable|date',
//         'age' => 'nullable|integer|min:18',
//         'sex' => 'nullable|in:male,female,other',
//         'mobile_num' => 'nullable|string|max:15',
//     ]);

//     $user = App\Models\User::create([
//         'name' => $request->name,
//         'email' => $request->email,
//         'password' => bcrypt($request->password),
//         'role' => $request->role,
//         'date_of_birth' => $request->date_of_birth,
//         'age' => $request->age,
//         'sex' => $request->sex,
//         'mobile_num' => $request->mobile_num,
//     ]);

//     $token = $user->createToken('auth_token')->plainTextToken;
//     return response()->json([
//         'message' => 'User registered successfully',
//         'user' => $user,
//         'token' => $token
//     ], 201);
// });
// Route::post('/login', function (Illuminate\Http\Request $request) {
//     $request->validate([
//         'email' => 'required|email',
//         'password' => 'required|string',
//     ]);

//     $user = App\Models\User::where('email', $request->email)->first();

//     if (!$user || !Hash::check($request->password, $user->password)) {
//         return response()->json(['message' => 'Invalid credentials'], 401);
//     }

//     $token = $user->createToken('auth_token')->plainTextToken; // This line causes the error >> متلعبش في دا ياعبدة وانتا بتختبر ال api
//     return response()->json(['token' => $token], 200);
// });

// // Routes requiring authentication
// Route::middleware('auth:sanctum')->group(function () {
//     // User profile and logout
//     Route::get('/user', [AuthController::class, 'user']);
//     Route::post('/logout', [AuthController::class, 'logout']);

//     // Admin-only routes
//     Route::middleware('admin')->group(function () {
//         Route::apiResource('cities', CityController::class);
//         Route::apiResource('users', UserController::class);
//         Route::apiResource('hotels', HotelController::class);
//         Route::apiResource('room_types', RoomTypeController::class);
//         Route::apiResource('rooms', RoomController::class);
//         Route::apiResource('room_images', RoomImageController::class);
//         Route::apiResource('transportation', TransportationController::class);
//         Route::apiResource('restaurants', RestaurantController::class);
//         Route::apiResource('entertainment_places', EntertainmentPlaceController::class);
//         Route::apiResource('ai_model_metadata', AiModelMetadataController::class);
//         Route::apiResource('recommendations', RecommendationController::class)->except(['index', 'show']);
//     });

//     // Routes accessible to authenticated users
//     Route::apiResource('bookings', BookingController::class);
//     Route::apiResource('payments', PaymentController::class);
//     Route::apiResource('reviews', ReviewController::class);
//     Route::apiResource('user_preferences', UserPreferenceController::class);
//     Route::apiResource('recommendations', RecommendationController::class)->only(['index', 'show']);
// });
// 


//new file
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\RoomTypeController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomImageController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserPreferenceController;
use App\Http\Controllers\Api\TransportationController;
use App\Http\Controllers\Api\RestaurantController;
use App\Http\Controllers\Api\EntertainmentPlaceController;
use App\Http\Controllers\Api\RecommendationController;
use App\Http\Controllers\Api\AiModelMetadataController;
use App\Http\Controllers\Api\HotelImageController;
use App\Http\Controllers\Api\HotelBookingController;
//Bearer>>مهمة
// Public routes for authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

// Public routes
Route::get('/hotels', [HotelController::class, 'index']);
Route::get('/hotels/{id}', [HotelController::class, 'show']);
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);

// Routes requiring authentication
Route::middleware('auth:sanctum')->group(function () {
    // Routes requiring email verification
    Route::middleware('verified.api')->group(function () {
        // User profile and logout
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Admin-only routes
        Route::middleware('admin')->group(function () {
            Route::apiResource('cities', CityController::class);
            Route::apiResource('users', UserController::class);
            Route::apiResource('hotels', HotelController::class)->except(['index', 'show']);
            Route::apiResource('room_types', RoomTypeController::class);
            Route::apiResource('rooms', RoomController::class);
            Route::apiResource('room_images', RoomImageController::class);
            Route::apiResource('transportation', TransportationController::class);
            Route::apiResource('restaurants', RestaurantController::class)->except(['index', 'show']);
            Route::apiResource('entertainment_places', EntertainmentPlaceController::class);
            Route::apiResource('ai_model_metadata', AiModelMetadataController::class);
            Route::apiResource('recommendations', RecommendationController::class)->except(['index', 'show']);
            Route::apiResource('hotel-images', HotelImageController::class);
        });

        // Routes accessible to authenticated and verified users
        Route::apiResource('room_types', RoomTypeController::class)->only(['index', 'show']);
        Route::apiResource('rooms', RoomController::class)->only(['index', 'show']);
        Route::apiResource('room_images', RoomImageController::class)->only(['index', 'show']);
        Route::apiResource('transportation', TransportationController::class)->only(['index', 'show']);
        Route::apiResource('entertainment_places', EntertainmentPlaceController::class)->only(['index', 'show']);
        Route::apiResource('bookings', BookingController::class);
        Route::apiResource('payments', PaymentController::class);
        Route::apiResource('reviews', ReviewController::class);
        Route::apiResource('user_preferences', UserPreferenceController::class);
        Route::apiResource('recommendations', RecommendationController::class)->only(['index', 'show']);
        Route::get('/hotels/{hotelId}/bookings', [HotelBookingController::class, 'index']);
    });

    // Resend verification email (available to authenticated but unverified users)
    Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail']);
});