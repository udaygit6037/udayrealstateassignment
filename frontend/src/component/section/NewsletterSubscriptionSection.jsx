import React, { useState } from "react";
// Assuming you have an api service setup
import api from '../../services/api.js'; 

const NewsletterSubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [message, setMessage] = useState(''); // Display message to user

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('Subscribing...');

    try {
      await api.post('/subscribe', { email });
      
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail(""); // Clear the input on success

    } catch (error) {
      setStatus('error');
      const errorMessage = error.response?.data?.error || 'Subscription failed. Please try again.';
      setMessage(errorMessage);
    }
  };

  return (
    <section className="bg-blue-700 py-10">
      <div className="max-w-6xl mx-auto px-5 text-center text-white">

        <h3 className="text-2xl font-semibold mb-4">Subscribe to our Newsletter</h3>
        
        {/* Display Status Message */}
        {message && (
          <p className={`mb-4 font-bold ${status === 'error' ? 'text-red-300' : 'text-green-300'}`}>
            {message}
          </p>
        )}

        <form
          onSubmit={submitHandler}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
        >
          <input
            // ... (rest of input props)
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-gray-800 w-full sm:w-96 focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-md font-medium shadow-md"
            disabled={status === 'loading'} // Disable button when loading
          >
            {status === 'loading' ? 'Processing...' : 'Subscribe'}
          </button>
        </form>

      </div>
    </section>
  );
};
export default NewsletterSubscriptionSection