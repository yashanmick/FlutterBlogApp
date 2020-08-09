const express = require('express');

const User = require("../models/userModel");

const router = express.Router();

//take an individual user data
router.route('/:username').get((req, res) => {
    User.findOne({ username: req.params.username }, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        res.json({
            data: result,
            username: req.params.username,
        });
    });
})

//login
router.route('/login').post((req, res) => {
    User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        if (result == null) {
            return res.status(403).json('Username is incorrect')
        }
        if (result.password == req.body.password) {
            //Here add JWT token logic
            res.json('ok');
        } else {
            res.status(403).json("Password is incorrect")
        }
    });
})


//register user
router.route('/register').post((req, res) => {
    console.log('Inside the register');
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    user.save()
        .then(() => {
            console.log('User registered');
            res.status(200).json('ok');
        })
        .catch((err) => {
            res.status(403).json({ message: err });
        });
});


//update user
router.route('/update/:username').patch((req, res) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $set: { password: req.body.password } },
        (err, result) => {
            if (err) return res.status(500).json({ message: err });
            const message = {
                message: 'Password successfully updated',
                username: req.params.username,
            };
            return res.json(message);
        }
    );
});

//delete user
router.route('/delete/:username').delete((req, res) => {
    User.findOneAndDelete({ username: req.params.username }, (err, result) => {
        if (err) return res.status(500).json({ message: err });
        const message = {
            message: "Username deleted",
            username: req.params.username,
        }
        return res.json(message);
    })
});

module.exports = router;