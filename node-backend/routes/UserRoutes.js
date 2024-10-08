const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure your SMTP transport
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "wanigasinghebookcollection@gmail.com",
        pass: 'rkpc rkjt uhth fiak'
    },
});

router.post("/register", async (req, res) => {
    const user = new UserModel(req.body);
    try {
        const savedUserModel = await user.save();

        // Email details
        const mailOptions = {
            from: 'wanigasinghebookcollection@gmail.com',
            to: user.email,
            subject: 'Welcome to the Wanigasinghe Books Collection!',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Hello ${user.firstName} ${user.lastName},</h2>
                    <p>Thank you for registering with us. We are excited to have you onboard and hope you enjoy your time here!</p>
                    <p>Feel free to explore our bookstore and let us know if you need any assistance.</p>
                    <br/>
                    <p style="font-size: 14px; color: #555;margin:0">Best regards,</p>
                     <p style="font-size: 14px; color: #555;margin:0">Kamindu Gayantha,</p>
                      <p style="font-size: 14px; color: #555;margin:0">System Administrator,</p>
                    <p style="font-size: 14px; color: #555;margin:0">Wanigasinghe Books Collection</p>
                    <div>
                        <img src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png" alt="Company Logo" width="170" />
                    </div>
                    <br/>
                    <p style="font-size: 12px; color: red;margin:0">This is an automated email. Please do not reply to this email.</p>
                </div>
            `
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending failed:', error);
                return res.status(500).json({ message: 'Email sending failed.' });
            }
            console.log('Email sent successfully:', info.response);
            res.json(savedUserModel);
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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

router.route("/get/:id").get(async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json(
            user
        );
    } catch (err) {
        res.json({ success: false, message: "An error occurred during login" });
    }
});

router.route("/fdd").get((req, res) => {
    // Fetch UserModel where isActive is true
    UserModel.find({ isActive: true })
        .then((users) => {
            res.json(
                users.map((user) => {
                    return {
                        _id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                    }
                }
                )
            ); // Return the filtered UserModel
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred' }); // Handle errors
        });
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            occupation: req.body.occupation,
            profileImage: req.body.profileImage
        }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.route("/password-reset/:id").put(async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user.password === req.body.currentPassword) {
            if (req.body.newPassword === req.body.reNewPassword) {
                const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                    password: req.body.newPassword
                }, { new: true });
                res.json({
                    message: 'Password updated successfully'
                });
            } else {
                res.status(400).json({ message: 'New passwords do not match' });
            }
        } else {
            res.status(400).json({ message: 'Current password is incorrect' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;