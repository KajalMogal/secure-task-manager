const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: [String],
        required: true
    },

    due: {
        type: Date,
        require: true
    },

    status: {
        type: String,
        enum: ['completed', 'pending'],
        default: 'pending'
    }

}    
, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);