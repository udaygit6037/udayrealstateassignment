import React from 'react';
import homeIcon from '../../assets/icons/home.svg';
import designIcon from '../../assets/icons/paintbrush-2.svg';
import marketingIcon from '../../assets/icons/circle-dollar-sign.svg';

const features = [
  {
    title: 'Real Estate Consultation',
    desc: 'Expert guidance for buying, selling, and investing in real estate. We help you make informed decisions.',
    icon: homeIcon,
  },
  {
    title: 'Interior Design',
    desc: 'Transform your spaces with our modern and functional design solutions tailored to your lifestyle.',
    icon: designIcon,
  },
  {
    title: 'Marketing Solutions',
    desc: 'Comprehensive marketing strategies to maximize your property\'s visibility and attract the right buyers.',
    icon: marketingIcon,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <img src={item.icon} alt={item.title} className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

