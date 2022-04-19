const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    name: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', (next) => {

    let user = this;
    if(user.isModified('password')) {

        bcrypt.genSalt(saltRounds, (err,salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err,hash) => {

                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
})

userSchema.methods.comparePassword = (plainPassword, cb) => {
    
    bcrypt.compare(plainPassword, this.password, (err,isMatch) => {

        if(err) return cb(err)
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = (cb) => {

    let user = this;
    let token = jwt.sign(user._id.toHexString(), 'secretToken');
    let oneHour = moment().add(1,'hour').valueOf();
    
    user.token = token;
    user.tokenExp = oneHour;
    user.save((err, user) => {
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token,cb) {

    let user = this;

    jwt.verify(token, 'secretToken', (err,decoded) => {
        user.findOne({ '_id': decoded, 'token': token }, (err,user) => {

            if(err) return cb(err)
            cb(null,user);
        })
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User }