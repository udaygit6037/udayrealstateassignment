import React from "react";
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import ContactForm from "../component/ContactForm.jsx";
import HeroConsultationSection from "../component/section/HeroConsultationSection.jsx";

const Contact = () => {
  return (
    <div className="font-sans min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
            <p className="text-xl text-orange-100">
              Get in touch for a free consultation
            </p>
          </div>
        </div>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              <div className="flex-1 max-w-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get A Free Consultation</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours. 
                  We're here to help you with all your real estate needs.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@realtrust.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <HeroConsultationSection />
        <Footer />
      </main>
    </div>
  );
};

export default Contact;

