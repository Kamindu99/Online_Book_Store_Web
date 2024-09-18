const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    const user = new UserModel(req.body);
    try {
        const savedUserModel = await user.save();
        res.json(savedUserModel);
    } catch (err) {
        res.json({ message: err });
    }
})

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await UserModel.find({ email: email, password: password });

        if (users.length > 0) {
            const data = { id: users[0].id, firstName: users[0].firstName, lastName: users[0].lastName };
            const accessToken = jwt.sign(data, 'abcd1234', { expiresIn: '1h' });
            const refreshToken = jwt.sign(data, '1234abcd', { expiresIn: '24h' });

            await UserModel.findOneAndUpdate({ _id: users[0]._id }, { $set: { refreshToken: refreshToken } });

            res.json({
                serviceToken: accessToken,
                user: {
                    id: users[0]._id,
                    email: users[0].email,
                    name: `${users[0].firstName} ${users[0].lastName}`,
                    occupation: users[0].occupation,
                    profileImage: users[0].profileImage
                }
            });
        } else {
            // Return a 401 response if the email or password is incorrect
            return res.status(401).json({ success: false, message: "Invalid Username or Password" });
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "An error occurred during login" });
    }
});

router.route("/account/me").get(async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'abcd1234');
        const user = await UserModel.findById(decoded.id);
        res.json({
            user: {
                id: user._id,
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
                occupation: user.occupation,
                profileImage: user.profileImage
            }
        });
    } catch (err) {
        res.json({ success: false, message: "An error occurred during login" });
    }
});

module.exports = router;