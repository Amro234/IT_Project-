<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;

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
        if (auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized access'], 403);
        }

        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'required|in:pending,completed,failed',
            'transaction_id' => 'nullable|string|max:255',
        ]);

        $payment = Payment::create($request->only(['booking_id', 'amount', 'payment_method', 'status', 'transaction_id']));
        return response()->json(['message' => 'Payment created successfully', 'data' => $payment], 201);
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
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
            'status' => 'required|in:pending,completed,failed',
            'transaction_id' => 'nullable|string|max:255',
        ]);

        $payment->update($request->only(['booking_id', 'amount', 'payment_method', 'status', 'transaction_id']));
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