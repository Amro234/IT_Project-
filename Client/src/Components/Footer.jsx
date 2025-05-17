import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex flex-col items-center">
              <img 
                src={`${process.env.PUBLIC_URL}/Assets/Logo.png`} 
                alt="EasyGO Logo" 
                className="h-12 w-auto mb-3"
              />
              <span className="text-xl font-semibold text-[#1f2937]">EasyGo</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#1f2937] mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-600 hover:text-[#2563eb]">About Us</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-[#2563eb]">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#1f2937] mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Safety</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#1f2937] mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563eb]">Facebook</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; 2025 EasyGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 