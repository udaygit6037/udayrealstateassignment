import React from "react";

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4 lg:px-8">

        {/* Text Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            We are a dedicated team providing high-end consultation, design excellence,
            and cutting-edge marketing solutions for real estate clients. Our mission is
            to deliver value, creativity, and measurable results.
          </p>
          <p className="mt-4 text-gray-600">
            Whether you're buying, selling, or investing — we guide you every step of the way.
          </p>
        </div>

        {/* Image */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg">
          <img src="/assets/images/about-us.jpg" className="w-full h-full object-cover" />
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
