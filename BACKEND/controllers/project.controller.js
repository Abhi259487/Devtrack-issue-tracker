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

const getProjects = async (req, res) => {
  try{
    const userId = req.user._id;
    const projects = await Project.find({userId});
    res.status(200).json({message:'Project fetched succesfully', projects});
  }
  catch(error){
    res.status(500).json({message: 'Error fetching projects', error: error.message});
  }
}

const getProjectById = async (req, res) => {
  try{
    const {id} = req.params;
    const project = await Project.findOne({_id: id, userId: req.user._id});

    if(!project){
      return res.status(404).json({message: 'Project not found'});
    }
    res.status(200).json({message: 'Project fetched succesfully', project});
  }
  catch(error){
    res.status(500).json({message: 'Error fetching project', error: error.message});
  }
};

const updateProject = async (req, res) => {
  try{
    const {id} = req.params;
    const {name, description, status} = req.body;
    const project = await Project.findOneAndUpdate({_id: id, userId: req.user._id}, {name, description, status}, {new: true, runValidators: true});
    if(!project){
      return res.status(404).json({message: 'Project not found'});
    }
    res.status(200).json({message: 'Project updated succesfully', project});
  }
  catch(error){
    res.status(500).json({message: 'Error updating project', error: error.message});
  }
}

const deleteProject = async (req, res) => {
  try{
    const {id} = req.params;
    const project = await Project.findOneAndDelete({_id: id, userId: req.user._id});
    if(!project){
      return res.status(404).json({message: 'Project not found'});
    }
    res.status(200).json({message: 'Project deleted succesfully', project});
  }
  catch(error){
    res.status(500).json({message: 'Error deleting project', error: error.message});
  }
}

export { createProject, getProjects, getProjectById, updateProject, deleteProject };