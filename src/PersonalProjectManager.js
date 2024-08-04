import React, { useState } from 'react';
import { Search, Settings, Plus } from 'lucide-react';

const categories = [
  'ALL PROJECTS',
  'PYTHON',
  'WEB DEV',
  'GAME DEV',
  'UNCATEGORIZED',
];

const ProjectCard = ({ title, description, category, isSelected }) => (
  <div
    className={`bg-white p-4 rounded-lg border border-gray-200 text-black transition-shadow hover:shadow-lg ${
      isSelected ? 'shadow-xl' : ''
    }`}
  >
    <h3 className="font-bold">{title}</h3>
    {category !== 'ALL PROJECTS' && (
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        {category}
      </span>
    )}
    <p className="text-sm mt-2">{description}</p>
  </div>
);

const initialProjects = [
  {
    id: 1,
    title: 'AI Chatbot',
    description: 'Develop an AI-powered chatbot for customer service',
    category: 'PYTHON',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'Build a scalable e-commerce website with React',
    category: 'WEB DEV',
  },
  {
    id: 3,
    title: 'Mobile RPG',
    description: 'Create a mobile role-playing game with Unity',
    category: 'GAME DEV',
  },
  {
    id: 4,
    title: 'Smart Home App',
    description: 'Design an app to control smart home devices',
    category: 'UNCATEGORIZED',
  },
  {
    id: 5,
    title: 'Data Visualization Tool',
    description: 'Develop a tool for creating interactive data visualizations',
    category: 'PYTHON',
  },
  {
    id: 6,
    title: 'Social Media Dashboard',
    description: 'Create a dashboard to manage multiple social media accounts',
    category: 'WEB DEV',
  },
  {
    id: 7,
    title: 'Augmented Reality Game',
    description: 'Develop an AR game for mobile devices',
    category: 'GAME DEV',
  },
  {
    id: 8,
    title: 'Productivity Tracker',
    description:
      'Build a cross-platform app to track personal and team productivity',
    category: 'UNCATEGORIZED',
  },
];

export default function PersonalProjectManager() {
  const [selectedCategory, setSelectedCategory] = useState('ALL PROJECTS');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'UNCATEGORIZED',
  });

  const filteredProjects =
    selectedCategory === 'ALL PROJECTS'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
      setNewProject({ title: '', description: '', category: 'UNCATEGORIZED' });
      setIsAddingProject(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <div className="text-2xl font-bold">Logo</div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 rounded-full px-4 py-2 pr-10"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="flex">
        <div className="w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-left py-2 px-4 rounded mb-2 mx-1 ${
                selectedCategory === category ? 'bg-blue-600' : 'bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setIsAddingProject(true)}
            className="flex items-center py-2 px-4 rounded mb-2 bg-green-600"
          >
            <Plus size={16} className="mr-2" /> Add Project
          </button>
        </div>

        <div className="w-1/2 px-4">
          <h1 className="text-3xl font-bold mb-8">Personal Project Manager</h1>
          <div className="grid grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <div key={project.id} onClick={() => setSelectedProject(project)}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  category={project.category}
                  isSelected={
                    selectedProject && selectedProject.id === project.id
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/4 pl-4">
          <h2 className="text-xl font-bold mb-4">Project Details</h2>
          <div className="bg-gray-800 p-4 rounded-lg h-64 flex items-center justify-center">
            {selectedProject ? (
              <div>
                <h3 className="font-bold">{selectedProject.title}</h3>
                <p className="text-sm mt-2">{selectedProject.description}</p>
                <p className="text-sm mt-2">
                  Category: {selectedProject.category}
                </p>
              </div>
            ) : (
              <p>Click a project to view its details</p>
            )}
          </div>
        </div>
      </div>

      {isAddingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-black">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            <input
              type="text"
              placeholder="Project Title"
              className="w-full p-2 mb-2 border roun11ded"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
            <textarea
              placeholder="Project Description"
              className="w-full p-2 mb-2 border rounded"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-2 border rounded"
              value={newProject.category}
              onChange={(e) =>
                setNewProject({ ...newProject, category: e.target.value })
              }
            >
              {categories
                .filter((cat) => cat !== 'ALL PROJECTS')
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsAddingProject(false)}
                className="mr-2 px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="fixed bottom-4 left-4 bg-gray-800 p-2 rounded">
        <Settings size={24} />
      </button>
    </div>
  );
}
