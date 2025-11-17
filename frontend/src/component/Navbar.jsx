import React, { useState } from 'react';
import { Menu, X, Home, Briefcase, Info, Star, Mail } from 'lucide-react';

// Data Definition: Keeping the navigation links outside of the component
// ensures this static data is not recreated on every render.
const navLinks = [
  { name: 'HOME', href: '#home', icon: Home },
  { name: 'SERVICES', href: '#services', icon: Briefcase },
  { name: 'ABOUT US', href: '#about', icon: Info },
  { name: 'TESTIMONIALS', href: '#testimonials', icon: Star },
];

/**
 * Navbar Component: Encapsulates all navigation UI and logic.
 * This makes the component reusable and keeps the main App clean.
 */
const Navbar = () => {
  // State to handle the mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand/Logo Section */}
          <div className="flex-shrink-0 flex items-center">
           <img src="./logo.svg" alt="logo" />
          </div>

          {/* Desktop Links and Contact Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 uppercase tracking-wide"
              >
                {link.name}
              </a>
            ))}
            {/* Contact Button */}
            <a
              href="#contact"
              className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-150 uppercase shadow-md"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition duration-150"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:hidden transition-all duration-300 ease-in-out bg-white border-t border-gray-200`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={toggleMenu}
              className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition duration-150 uppercase"
            >
              <link.icon className="h-5 w-5 text-gray-500" />
              <span>{link.name}</span>
            </a>
          ))}
          {/* Mobile Contact Button */}
          <a
            href="#contact"
            onClick={toggleMenu}
            className="w-full text-center mt-3 block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150 shadow-md uppercase"
          >
            CONTACT
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;