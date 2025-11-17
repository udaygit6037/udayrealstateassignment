
import React from "react";
import ContactForm from "../ContactForm.jsx";
import bgImage from '../../assets/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg';

const HeroConsultationSection = () => {
  // Use a simulated background image or dark overlay
  const backgroundStyle = {
    // This is a dark gradient overlay on a generic business image placeholder
    backgroundImage: ` url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section 
      id="home" 
      className="h-[80vh] flex items-center justify-center p-8 relative"
      style={backgroundStyle}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content (Title and Description) */}
        <div className="text-white lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            Consultation, <br />
            Design, <br />
            & Marketing
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-md mx-auto lg:mx-0">
            Guiding your real estate journey with expertise and integrity.
          </p>
        </div>

        {/* Right Content (Contact Form) */}
        <div className="lg:w-1/3 flex justify-center">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
export default HeroConsultationSection;