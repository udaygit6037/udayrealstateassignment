import React from "react";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import AboutUsSection from "../component/section/AboutUsSection.jsx";
import RealtorIntroSection from "../component/section/RealtorIntroSection.jsx";
import HappyClientsSection from "../component/section/ClientSection.jsx";

const About = () => {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Us</h1>
            <p className="text-xl text-orange-100">
              Your trusted partner in real estate excellence
            </p>
          </div>
        </div>

        <AboutUsSection />
        <RealtorIntroSection />
        <HappyClientsSection />
        <Footer />
      </main>
    </div>
  );
};

export default About;

