import React from "react";
import homeIcon from '../../assets/icons/home.svg';
import designIcon from '../../assets/icons/paintbrush-2.svg';
import marketingIcon from '../../assets/icons/circle-dollar-sign.svg';
const features = [
  {
    title: "Potential ROI",
    desc: "A diverse collection of successful projects built with quality and trust.",
    icon: homeIcon,
  },
  {
    title: "Design",
    desc: "We craft modern and user-focused design solutions for your real estate needs.",
    icon: designIcon,
  },
  {
    title: "Marketing",
    desc: "Advanced marketing strategies to elevate your property and attract clients.",
    icon: marketingIcon,
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="whyus">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <img src={item.icon} className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
