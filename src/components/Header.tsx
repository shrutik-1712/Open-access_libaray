import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-6 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/api/placeholder/50/50" alt="Library Logo" className="mr-4" />
        <h1 className="text-2xl font-bold">Open Access Library</h1>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <MapPin size={18} className="text-gray-600 mr-2" />
          <p className="text-sm">123 Library St, Booktown</p>
        </div>
        <div className="flex items-center">
          <Phone size={18} className="text-gray-600 mr-2" />
          <p className="text-sm">(123) 456-7890</p>
        </div>
      </div>
    </div>
    <nav className="bg-gray-800 text-white">
      <ul className="container mx-auto px-4 py-2 flex justify-between">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
        <li><Link to="/facilities" className="hover:text-gray-300">Library Facilities</Link></li>
        <li><Link to="/opac" className="hover:text-gray-300">OPAC Library</Link></li>
        <li><Link to="/alumni" className="hover:text-gray-300">Alumni / Achievers</Link></li>
        <li><Link to="/events" className="hover:text-gray-300">Events and Exhibitions</Link></li>
        <li><Link to="/donations" className="hover:text-gray-300">Donations</Link></li>
        <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;