interface Project {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "Description of project 1. Replace this with your actual project description.",
    imageUrl: "/project1.jpg" // Add your actual image path
  },
  {
    title: "Project 2",
    description: "Description of project 2. Replace this with your actual project description.",
    imageUrl: "/project2.jpg" // Add your actual image path
  }
];

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
      {projects.map((project, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
