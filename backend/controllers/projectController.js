import Project from '../models/Project.js';

// Get all projects (public)
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        return res.json({ projects });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Get single project (public)
export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.json({ project });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Create project (admin only)
export const createProject = async (req, res) => {
    try {
        const { title, description, imageUrl } = req.body;
        console.log('📦 Create project request received:', { title, description, imageUrl });
        
        if (!title || !description || !imageUrl) {
            console.error('❌ Missing required fields for project');
            return res.status(400).json({ error: 'Title, description, and imageUrl are required' });
        }
        
        const project = new Project({ 
            title: title.trim(), 
            description: description.trim(), 
            imageUrl: imageUrl.trim() 
        });
        
        console.log('💾 Saving project to database...');
        await project.save();
        console.log('✅ Project saved successfully:', project._id);
        
        return res.status(201).json({ project });
    } catch (err) {
        console.error('❌ Error in createProject controller:', err);
        console.error('Error details:', {
            message: err.message,
            name: err.name,
            code: err.code
        });
        return res.status(500).json({ error: 'Server error: ' + err.message });
    }
};

// Update project (admin only)
export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, imageUrl } = req.body;
        
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (title) project.title = title;
        if (description) project.description = description;
        if (imageUrl) project.imageUrl = imageUrl;

        await project.save();
        return res.json({ project });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

// Delete project (admin only)
export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        return res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
};

