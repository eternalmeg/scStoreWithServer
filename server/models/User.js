const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 20,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: 9,
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: [6, 'Phone must be at least 6 characters long'],
        maxLength: [12, 'Phone cannot exceed 12 characters']
    },
    password: {
        type: String,
        minLength: [5, 'Password must be 4 characters at lest'],
        required: [true, 'password is required']
    },
    createdDevice: [{
        type: mongoose.Types.ObjectId,
        ref: 'Device'
    }],
    preferDevice: [{
        type: mongoose.Types.ObjectId,
        ref: 'Device'
    }]

});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 12);
});


const User = mongoose.model('User', userSchema);
module.exports = User;
