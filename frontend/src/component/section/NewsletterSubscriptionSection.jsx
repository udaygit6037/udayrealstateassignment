import React, { useState } from "react";

const NewsletterSubscriptionSection = () => {
  const [email, setEmail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-blue-700 py-10">
      <div className="max-w-6xl mx-auto px-5 text-center text-white">

        <h3 className="text-2xl font-semibold mb-4">Subscribe to our Newsletter</h3>

        <form
          onSubmit={submitHandler}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-6"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 rounded-md text-gray-800 w-full sm:w-96 focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-md font-medium shadow-md"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default NewsletterSubscriptionSection;
