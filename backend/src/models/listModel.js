import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'List title is required'],
        trim: true
    },

    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        required: true
    },

    position: {
        type: Number,
        default: 0 // Used for drag and drop ordering of elements
    }

}, {timestamps: true});

const List = mongoose.model('List', listSchema);
export default List;