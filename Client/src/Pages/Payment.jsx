import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreditCard, Lock, Calendar, Users, Building, Shield, CheckCircle2 } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Here you would typically make an API call to process the payment
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Navigate to success page
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Lock className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Secure Payment</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
                <div className="flex items-center text-green-600">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${
                      paymentMethod === 'credit'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                    <span className="font-medium">Credit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('debit')}
                    className={`p-4 rounded-lg border-2 flex items-center justify-center ${
                      paymentMethod === 'debit'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                    <span className="font-medium">Debit Card</span>
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg text-white font-medium flex items-center justify-center ${
                    isProcessing
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Pay Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Hotel Name</span>
                  </div>
                  <span className="font-medium">Luxury Resort</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Check-in</span>
                  </div>
                  <span className="font-medium">May 15, 2024</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Check-out</span>
                  </div>
                  <span className="font-medium">May 20, 2024</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Guests</span>
                  </div>
                  <span className="font-medium">2 Adults</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">$1,200.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">$120.00</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">$1,320.00</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">Free cancellation within 24 hours</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">Instant confirmation</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">Secure payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 