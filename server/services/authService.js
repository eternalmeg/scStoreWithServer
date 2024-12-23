const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt')
const Device = require("../models/Device");
const SECRET = 'hklhkjhjhjhhkh445hhhkhj';

exports.register = async (userData) => {
    const userExistCheck = await User.findOne({ email: userData.email});
    if (userExistCheck) {
        throw new Error('This email address is already used.');
    }
    const user = await User.create(userData);
    const result = generateToken(user);
    return result;

}

exports.login = async ({ email, password }) => {
    console.log('Received login request for email:', email);
    const user = await User.findOne({ email });
    console.log('Found user:', user);


    if (!user) {
        console.error('User not found');
        throw new Error('Invalid email or password.');
    }
    const isValid = await bcrypt.compare(password, user.password);
    console.log('Password is valid:', isValid);

    if (!isValid) {
        console.error('Invalid password');
        throw new Error('Invalid email or password.');
    }

    const result = await generateToken(user);
    console.log('Generated token result:', result);

    return result;
}
exports.getInfo = async (userId) => {
    const user = await User.findById(userId).populate('createdDevice').populate('preferDevice');
    return user
};

exports.edit = async (userId, userData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, userData, {
            runValidators: true,
            new: true // Връща обновения потребител вместо стария
        });

        if (!user) {
            throw new Error('User not found'); // Съобщение, ако потребителят не е намерен
        }

        const payload = {
            _id: user._id,
            email: user.email,
        };
        const token = await jwt.sign(payload, SECRET, { expiresIn: '2h' });

        return { user, token };
    } catch (err) {
        // Ако грешката е от Mongoose (валидация или друга)
        if (err.name === 'ValidationError') {
            const errorMessages = Object.values(err.errors).map(e => e.message);
            throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
        }

        // Ако грешката е различна
        throw new Error(err.message || 'An error occurred while updating the user');
    }
};



exports.getOwners = async (ownerIds) => {
   return  await User.find({_id: {$in: ownerIds}});
}

exports.getUserById = async (userId) => {
    const user =  await User.findById(userId);
    if(!user) {
        console.error('User not found');
        throw new Error('User not found');
    }
    return user;
}




async function generateToken(user) {

    const payload = {
        _id: user._id,
        email: user.email,
    };
    console.log('Payload for JWT:', payload);
    const token = await jwt.sign(payload, SECRET, {expiresIn: '24h'});

    const result = {
        _id: user._id,
        email: user.email,
        accessToken: token
    };
    return result;

}


