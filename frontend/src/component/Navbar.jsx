import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Info, Star, LogIn, User } from 'lucide-react';
import { isAuthenticated } from '../services/authService.js';

// Data Definition: Keeping the navigation links outside of the component
// ensures this static data is not recreated on every render.
const navLinks = [
  { name: 'HOME', path: '/', icon: Home },
  { name: 'SERVICES', path: '/services', icon: Briefcase },
  { name: 'ABOUT US', path: '/about', icon: Info },
  { name: 'PROJECTS', path: '/projects', icon: Star },
];

/**
 * Navbar Component: Encapsulates all navigation UI and logic.
 * This makes the component reusable and keeps the main App clean.
 */
const Navbar = () => {
  // State to handle the mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
    
    // Check immediately
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab or same tab)
    const handleAuthChange = () => {
      checkAuth();
    };
    
    // Listen for custom storage event (for same-tab logout)
    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('auth-change', handleAuthChange);
    
    // Also check on route changes
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('auth-change', handleAuthChange);
      clearInterval(interval);
    };
  }, [location]);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if we're on homepage for anchor links
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand/Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src="./logo.svg" alt="logo" />
            </Link>
          </div>

          {/* Desktop Links and Contact Button */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={isHomePage && link.path === '/' ? '#home' : link.path}
                onClick={() => {
                  if (isHomePage && link.path === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            {/* Contact Button */}
            <Link
              to={isHomePage ? '#contact' : '/contact'}
              onClick={() => {
                if (isHomePage) {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="ml-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-150 uppercase shadow-md"
            >
              CONTACT
            </Link>
            {/* Login/Admin Button */}
            {authenticated ? (
              <Link
                to="/admin"
                className="ml-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-150 uppercase shadow-md"
              >
                <User className="w-4 h-4" />
                ADMIN
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="ml-4 flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm font-medium transition duration-150 uppercase shadow-md"
              >
                <LogIn className="w-4 h-4" />
                LOGIN
              </Link>
            )}
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
            <Link
              key={link.name}
              to={isHomePage && link.path === '/' ? '#home' : link.path}
              onClick={() => {
                toggleMenu();
                if (isHomePage && link.path === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 transition duration-150 uppercase"
            >
              <link.icon className="h-5 w-5 text-gray-500" />
              <span>{link.name}</span>
            </Link>
          ))}
          {/* Mobile Contact Button */}
          <Link
            to={isHomePage ? '#contact' : '/contact'}
            onClick={() => {
              toggleMenu();
              if (isHomePage) {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className="w-full text-center mt-3 block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150 shadow-md uppercase"
          >
            CONTACT
          </Link>
          {/* Mobile Login/Admin Button */}
          {authenticated ? (
            <Link
              to="/admin"
              onClick={toggleMenu}
              className="w-full text-center mt-3 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150 shadow-md uppercase"
            >
              <User className="w-4 h-4" />
              ADMIN PANEL
            </Link>
          ) : (
            <Link
              to="/admin/login"
              onClick={toggleMenu}
              className="w-full text-center mt-3 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 shadow-md uppercase"
            >
              <LogIn className="w-4 h-4" />
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;