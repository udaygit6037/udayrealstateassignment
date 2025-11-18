import React, { useState } from 'react';
import { submitContact } from '../services/contactService.js';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      await submitContact(formData);
      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', city: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      alert(err?.response?.data?.error || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150";

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-sm" id="contact">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Get A Free Consultation
      </h3>
      {success && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-md text-sm text-center">
          Thank you! We'll contact you soon.
        </div>
      )}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Message (Optional)"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className={inputClass}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition duration-150 uppercase shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {loading ? 'Submitting...' : 'Get Quick Quote'}
        </button>
      </form>
    </div>
  );
};
export default ContactForm;