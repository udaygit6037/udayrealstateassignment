const ClientCard = ({ client }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center border border-gray-100 transition duration-300 hover:shadow-xl">
      
      {/* Client's Image (Circular) */}
      <img
        src={client.imageUrl}
        alt={client.name}
        className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md"
        // Fallback for image loading error
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/cccccc/ffffff?text=User" }}
      />

      {/* Client's Description/Testimonial */}
      <p className="text-gray-600 text-sm italic mb-4">
        &ldquo;{client.description}&rdquo;
      </p>

      {/* Client's Name */}
      <h4 className="text-base font-bold text-blue-600 mb-1">
        {client.name}
      </h4>

      {/* Client's Designation */}
      <p className="text-xs text-gray-400 uppercase tracking-wider">
        {client.designation}
      </p>
    </div>
  );
};
export default ClientCard;