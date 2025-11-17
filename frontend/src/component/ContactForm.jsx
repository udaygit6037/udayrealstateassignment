import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', formData);
    // In a real application, you would send this data to the backend here.
    alert('Form submitted! Check console for data.');
  };

  const inputClass = "w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150";

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm" id="contact">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Get A Free Consultation
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="Area, City"
            value={formData.city}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition duration-150 uppercase shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Get Quick Quote
        </button>
      </form>
    </div>
  );
};
export default ContactForm;