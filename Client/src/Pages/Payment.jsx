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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          <Lock className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Secure Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Details</h2>
                <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-8">
                <label className="block text-base font-medium text-gray-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentMethod('credit')}
                    className={`p-5 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                      paymentMethod === 'credit'
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-7 h-7 mr-3 text-blue-600" />
                    <span className="font-medium text-lg">Credit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('debit')}
                    className={`p-5 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                      paymentMethod === 'debit'
                        ? 'border-blue-600 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <CreditCard className="w-7 h-7 mr-3 text-blue-600" />
                    <span className="font-medium text-lg">Debit Card</span>
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="19"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      Expiry Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        maxLength="5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-3">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-xl text-white font-medium text-lg flex items-center justify-center transition-all duration-200 ${
                    isProcessing
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-6 h-6 mr-3" />
                      Pay Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-8 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">Order Summary</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Building className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 text-lg">Hotel Name</span>
                  </div>
                  <span className="font-medium text-lg">Luxury Resort</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 text-lg">Check-in</span>
                  </div>
                  <span className="font-medium text-lg">May 15, 2024</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Calendar className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 text-lg">Check-out</span>
                  </div>
                  <span className="font-medium text-lg">May 20, 2024</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 text-gray-400 mr-3" />
                    <span className="text-gray-600 text-lg">Guests</span>
                  </div>
                  <span className="font-medium text-lg">2 Adults</span>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-lg">Subtotal</span>
                    <span className="font-medium text-lg">$1,200.00</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-lg">Taxes & Fees</span>
                    <span className="font-medium text-lg">$120.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xl font-semibold pt-4 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">$1,320.00</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Free cancellation within 24 hours</span>
                  </div>
                  <div className="flex items-start p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Instant confirmation</span>
                  </div>
                  <div className="flex items-start p-4 bg-green-50 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">Secure payment</span>
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