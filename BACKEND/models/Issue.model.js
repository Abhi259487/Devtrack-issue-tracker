import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        enum: ['Todo', 'In Progress', 'Completed'],
        default: 'Todo'
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true

    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;