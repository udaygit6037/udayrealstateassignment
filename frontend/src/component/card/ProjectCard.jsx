const ProjectCard = ({ project }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      {/* Project's Image (Placeholder) */}
      <img 
        src={project.imageUrl} 
        alt={project.title} 
        className="w-full h-auto object-cover rounded-lg shadow-lg mb-4"
        style={{ aspectRatio: '400 / 250' }} // Maintain aspect ratio for placeholders
      />
      
      {/* Project's Name */}
      <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wider mt-2 mb-1">
        {project.title}
      </h3>
      
      {/* Project's Description */}
      <p className="text-sm text-gray-500 mb-4">
        {project.description}
      </p>

      {/* Dummy Read More Button */}
      <button 
        onClick={() => console.log(`Read more for ${project.title}`)}
        className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-6 rounded-md transition duration-150 uppercase shadow-md"
        // Non-functional as per requirement
      >
        READ MORE
      </button>
    </div>
  );
};
export default ProjectCard;