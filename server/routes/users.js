const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// register route
router.post('/api/users/register', (req,res) => {

    const user = new User(req.body);
    user.save((err,doc) => {

        if(err) return res.json({
            success: false, err
        })
        return res.status(200).json({
            success: true
        })
    })
})

// login route
router.post('/api/users/login', (req,res) => {

    User.findOne({ email: req.body.email }, (err,user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: 'Cannot Find User'
            });
        }

        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: 'Incorrect Password'
                })
            }
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                res.cookie('x_auth', user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                    userId: user._id
                })
            }); 
        })
    })
})

// logout route
router.get('/api/users/logout', auth, (req,res) => {

    User.AndUpdate({ _id: req.user._id }, { token: '', tokenExp: '' }, (err,doc) => {

        if(err) return res.json({
            success: false, err
        })
        return res.status(200).send({ 
            success: true 
        });
    })
})

// auth route
router.get('/api/users/auth', auth, (req,res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image
    })
})

module.exports = router