import React, { useState } from 'react';
import { MapPin, Phone, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/facilities", label: "Library Facilities" },
    { to: "/opac", label: "OPAC Library" },
    { to: "/alumni", label: "Alumni / Achievers" },
    { to: "/events", label: "Events and Exhibitions" },
    { to: "/donations", label: "Donations" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/50/50" alt="Library Logo" className="mr-4" />
          <h1 className="text-2xl font-bold">Open Access Library</h1>
        </div>
        <div className="hidden md:flex items-center">
          <div className="flex items-center mr-4">
            <MapPin size={18} className="text-gray-600 mr-2" />
            <p className="text-sm">123 Library St, Booktown</p>
          </div>
          <div className="flex items-center">
            <Phone size={18} className="text-gray-600 mr-2" />
            <p className="text-sm">(123) 456-7890</p>
          </div>
        </div>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <nav className={`bg-gray-800 text-white ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="container mx-auto px-4 py-2 flex flex-col md:flex-row md:justify-between ">
          {navItems.map((item, index) => (
            <li key={index} className="py-2 md:py-0">
              <button
                onClick={() => handleNavigation(item.to)}
                className="hover:text-gray-300 block w-full text-left"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;