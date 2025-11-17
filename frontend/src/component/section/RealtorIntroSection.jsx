import React from "react";
import img1 from '../../assets/images/Ellipse 11.svg';
import img2 from '../../assets/images/Ellipse 12.svg';
import img3 from '../../assets/images/Ellipse 13.svg';
const RealtorIntroSection = () => {
  return (
    <section className="py-16 bg-white" id="intro">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* Text */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Not Your Average Realtor
          </h2>
          <p className="mt-4 text-gray-600">
            We provide expert consultation, modern design, and world-class marketing
            to help you grow your real estate business effortlessly.
          </p>
        </div>

        {/* 3 Circular Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 place-items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
            <img src= {img1} className="w-full h-full object-cover" />
          </div>
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
            <img src={img2} className="w-full h-full object-cover" />
          </div>
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
            <img src={img3} className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default RealtorIntroSection;
