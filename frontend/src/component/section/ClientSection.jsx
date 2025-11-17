import React from 'react';
import ClientCard from '../card/ClientCard.jsx';
import img1 from '../../assets/images/Ellipse 29.svg';
import img2 from '../../assets/images/Ellipse 28.svg';
import img3 from '../../assets/images/Ellipse 31.svg';
import img4 from '../../assets/images/Ellipse 33.svg';
import img5 from '../../assets/images/Ellipse 35.svg';
const HappyClientsSection = () => {
  // Mock Client Data (MOVED INSIDE to guarantee local scope access)
  const clientData = [
    {
      id: 1,
      name: "Rowhan Smith",
      designation: "CEO, Foreclosure",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imageUrl: img1
    },
    {
      id: 2,
      name: "Shipra Kayak",
      designation: "Brand Designer",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imageUrl: img2
    },
    {
      id: 3,
      name: "John Lepore",
      designation: "CEO, Foreclosure",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imageUrl: img3
    },
    {
      id: 4,
      name: "Marry Freeman",
      designation: "Marketing Manager at Mxitt",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imageUrl: img4
    },
    {
      id: 5,
      name: "Lucy",
      designation: "Sales Rep at Alibaba",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      imageUrl: img5
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
            Happy Clients
          </h2>
          <p className="text-xl text-gray-600">
            Hear from those who trusted us with their projects.
          </p>
        </div>

        {/* Testimonials Grid: Responsive layout (1 to 5 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {clientData.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default HappyClientsSection;