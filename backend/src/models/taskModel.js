import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({

    title: {
        type: string,
        required: [true, 'Task title is required'],
        trim: true
    },

    description: {
        type: string,
        trim: true,
        default: ""
    },

    listId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },

    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Board',
        required: true
    },

    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }], // Array of users that have been assigned a particular task in Board(project)

    position: {
        type: Number,
        default: 0
    }

}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
export default Task;