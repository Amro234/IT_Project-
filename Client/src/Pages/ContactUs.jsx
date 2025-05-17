import React, { useState } from 'react';
import { Phone, Mail, MapPin, Twitter, Instagram, Facebook, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f4f6f8] font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="relative bg-[#1e3a8a] p-12 lg:p-16">
              {/* Gradient Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#2563eb]/20 to-[#1e3a8a]/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h2 className="text-3xl font-bold text-white mb-2">Contact Information</h2>
                <p className="text-gray-300 mb-12">Say something to start a live chat!</p>

                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-white" size={24} />
                    <p className="text-white">+1012 3456 789</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="text-white" size={24} />
                    <p className="text-white">EasyGo@gmail.com</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-white mt-1" size={24} />
                    <p className="text-white">132 Sherif Street
                    <br />downtown Cairo<br />Egypt</p>
                  </div>
                </div>

                {/* Social Media Buttons */}
                <div className="flex space-x-4 mt-16">
                  <button type="button" className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                    <Twitter className="text-[#1e3a8a]" size={20} />
                  </button>
                  <button type="button" className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                    <Instagram className="text-[#1e3a8a]" size={20} />
                  </button>
                  <button type="button" className="p-3 bg-white rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110">
                    <Facebook className="text-[#1e3a8a]" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-12 lg:p-16">
              <h2 className="text-2xl font-bold text-[#2563eb] mb-8">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-[#333333]">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-[#333333]">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#333333]">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#333333]">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1012 3456 789"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#333333]">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message.."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2563eb] focus:ring-[#2563eb] sm:text-sm transition-all duration-300"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#10b981] hover:bg-[#0d9c6e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#10b981] transition-all duration-300 hover:shadow-lg"
                  >
                    Send Message
                    <Send className="ml-2" size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
