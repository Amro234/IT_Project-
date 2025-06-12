import React, { useState } from 'react';
import { Phone, Mail, MapPin, Twitter, Instagram, Facebook } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#00000] flex items-center justify-center font-['Inter',sans-serif]">
      <div className="relative w-full max-w-5xl mx-auto p-4">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row min-h-[500px]">
          {/* Contact Information */}
          <div className="relative bg-[#002060] p-8 lg:p-12 w-full lg:w-2/5 rounded-xl shadow-lg lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2 z-10 flex flex-col justify-center text-white space-y-8">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <MapPin className="text-white" size={20} />
                <p className="text-lg">Cairo - Ramses<br/>Building 85 - Street 45</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-white" size={20} />
                <p className="text-lg">EasyGo@gmail.com</p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-white" size={20} />
                <p className="text-lg">01146879632</p>
              </div>
            </div>

            {/* Social Media Buttons */}
            <div className="flex space-x-6 mt-8">
              <button type="button" className="text-white hover:scale-110 transition-transform duration-300">
                <Twitter size={24} />
              </button>
              <button type="button" className="text-white hover:scale-110 transition-transform duration-300">
                <Instagram size={24} />
              </button>
              <button type="button" className="text-white hover:scale-110 transition-transform duration-300">
                <Facebook size={24} />
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 lg:p-12 bg-white flex-1 lg:ml-[40%] flex flex-col justify-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Get in Touch</h2>
            <p className="text-gray-600 mb-8 text-sm">Fill in the form to start a conversation</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (Optional)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your message.."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                ></textarea>
              </div>

              <div className="flex justify-start">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-blue-800 bg-[#C6E2FF] hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 shadow-md"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
