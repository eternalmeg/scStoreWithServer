const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    brand: {
        type: String,
        minLength: [2, 'Minimum characters 2'],
        maxLength: [12, 'Max characters 12'],
        required: true
    },
    model: {
        type: String,
        minLength: [2, 'Minimum characters 2'],
        maxLength: [15, 'Max characters: 15'],
        required: true
    },
    image: {
        type: String,
        match: [/^https?:\/\/\S+$/, 'Url must starts with https'],
        required: true
    },
    description: {
        type: String,
        minLength: [10, 'Minimum characters 10'],
        maxLength: [480, 'Max characters: 480'],
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    preferredList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    createdAt: Date,
});

deviceSchema.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
})
const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;
