import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({

    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true,
        index: true // DB creates a sorted list for faster and optimized retrieval.
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    action: {
        type: string,
        required: true,
        enum: ['CREATE_TASK', 'UPDATE_TASK', 'DELETE_TASK', 'MOVE_TASK', 'ADD_MEMBER', 'REMOVE_MEMBER']
    },

    details: {
        taskTitle: String,
        fromList: String,
        toList: string
    }
}, {timestamps: true})

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;

