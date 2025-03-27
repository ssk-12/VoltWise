import React from 'react';
import { Building, Phone, Mail, Linkedin, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Top Centered Logo and Overview */}
        <div className="flex flex-col items-center space-y-4 mb-12">
          <div className="flex items-center space-x-4">
            <img 
              src="delhi.png" 
              alt="Delhi Electricity Prediction Logo" 
              className="w-16 h-16 bg-white p-2 rounded"
            />
            <h2 className="text-2xl font-bold">Delhi Power Insight</h2>
          </div>
          <p className="text-gray-300 text-sm text-center">
            Innovative electricity demand prediction solutions for Delhi energy management.
          </p>
        </div>

        {/* Remaining Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          {/* Government Partners */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-3">Government Partners</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="niti.png" 
                  alt="NITI Aayog Logo" 
                  className="w-10 h-10 bg-white p-1 rounded"
                />
                <a 
                  href="https://www.niti.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-300 transition-colors"
                >
                  NITI Aayog
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <img 
                  src="power.png" 
                  alt="Ministry of Power Logo" 
                  className="w-10 h-10 bg-white p-1 rounded"
                />
                <a 
                  href="https://powermin.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-300 transition-colors"
                >
                  Ministry of Power
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-3">Contact</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <Building size={20} className="text-white" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-white" />
                <span>+91-11-XXXXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-white" />
                <span>contact@delhipower.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-3">Connect</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <Twitter size={24} />
                  </a>
                  <a href="#" className="hover:text-gray-300 transition-colors">
                    <Globe size={24} />
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white">Privacy Policy</a>
                <a href="#" className="block text-gray-300 hover:text-white">Terms of Service</a>
                <a href="#" className="block text-gray-300 hover:text-white">Sitemap</a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Additional Information */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Delhi Power Insight. All Rights Reserved.</p>
          <p className="mt-2">Powered by Advanced Energy Analytics</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
