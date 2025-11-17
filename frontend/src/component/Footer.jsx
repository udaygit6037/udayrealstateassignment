import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0C1E35] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-semibold mb-4">RealTrust</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Providing modern real estate consultation, design, and marketing solutions.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#projects" className="hover:text-white">Projects</a></li>
            <li><a href="#whyus" className="hover:text-white">Why Choose Us</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-gray-300">info@realtrust.com</p>
          <p className="text-gray-300">+91 98765 43210</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-white/20 pt-4 text-center text-gray-300 text-sm">
        © 2024 RealTrust. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
