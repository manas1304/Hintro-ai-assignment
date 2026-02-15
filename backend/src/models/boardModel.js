import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
    
    title: {
        type: string,
        required: [true, 'Board title is required'],
        trim: true
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId, // Stores the user ID like 507aiudba124923 to uniquely identify the user
        ref: 'User',
        required: true
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }] // Array of user IDs ( since One board can have multiple members)

}, {timestamps: true});

const Board = mongoose.model('Board', boardSchema);
export default Board;