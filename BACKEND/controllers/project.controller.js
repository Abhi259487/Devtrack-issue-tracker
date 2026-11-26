import Project from '../models/Project.model.js';


const createProject = async (req, res) => {
  try {
    const { name, description, status} = req.body;
    if(!name){
        return res.status(400).json({ message: 'Project name is required' });
    }
    const userId = req.user._id; 
    const newProject = new Project({ name, description, status, userId });
    const savedProject = await newProject.save();
    res.status(201).json({message: "Project created succesfull", savedProject});
  }
  catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

export { createProject };