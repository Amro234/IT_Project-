<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        if (auth()->user()->role === 'admin') {
            $payments = Payment::with('booking')->get();
        } else {
            $payments = Payment::with('booking')->whereHas('booking', function ($query) {
                $query->where('user_id', auth()->id());
            })->get();
        }
        return response()->json($payments, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:credit,debit',
            'card_number' => 'required|string|max:19',
            'card_name' => 'required|string|max:255',
            'expiry_date' => 'required|string|max:5',
            'email' => 'required|email',
            'phone' => 'required|string|max:15'
        ]);

        try {
            $booking = Booking::findOrFail($request->booking_id);
            
            // Verify booking belongs to user or user is admin
            if (auth()->user()->role !== 'admin' && $booking->user_id !== auth()->id()) {
                return response()->json(['error' => 'Unauthorized access'], 403);
            }

            // Verify booking amount matches payment amount
            if (abs($booking->total_price - $request->amount) > 0.01) {
                return response()->json(['error' => 'Payment amount does not match booking amount'], 422);
            }

            DB::beginTransaction();

            // Create payment record
            $payment = Payment::create([
                'booking_id' => $request->booking_id,
                'amount' => $request->amount,
                'payment_method' => $request->payment_method,
                'status' => 'completed',
                'transaction_id' => uniqid('TRX-')
            ]);

            // Update booking status
            $booking->update(['status' => 'confirmed']);

            DB::commit();

            return response()->json([
                'message' => 'Payment processed successfully',
                'data' => $payment
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Payment processing failed: ' . $e->getMessage());
            return response()->json(['error' => 'Payment processing failed'], 500);
        }
    }

    public function show(Payment $payment)
    {
        if (auth()->user()->role !== 'admin' && $payment->booking->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $payment->load('booking');
        return response()->json($payment, 200);
    }

    public function update(Request $request, Payment $payment)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'status' => 'required|in:pending,completed,failed',
            'transaction_id' => 'nullable|string|max:255'
        ]);

        $payment->update($request->only(['status', 'transaction_id']));
        return response()->json(['message' => 'Payment updated successfully', 'data' => $payment], 200);
    }

    public function destroy(Payment $payment)
    {
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully'], 200);
    }
}