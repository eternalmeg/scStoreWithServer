const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const noSpaceValidator = {
    validator: function (value) {
        return !/\s/.test(value);
    }, message: 'No empty space or tabs!'
}

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
        minLength: [8, 'Email must be at least 8 characters long'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minLength: 9
    },
    password: {
        type: String,
        minLength: 4,
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
