import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'Not Started',
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });



const Project = mongoose.model('Project', projectSchema);
export default Project;