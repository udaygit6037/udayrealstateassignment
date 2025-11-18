import React from "react";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import WhyChooseUsSection from "../component/section/WhyChooseUsSection.jsx";
import FeatureSection from "../component/section/FeatureSection.jsx";

const Services = () => {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Our Services</h1>
            <p className="text-xl text-orange-100">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </div>
        </div>

        <FeatureSection />
        <WhyChooseUsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Services;

