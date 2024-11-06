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

        // Check if the email is already in use
        const existingUser = await UserModel.findOne({ email: user.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
        }

        const savedUserModel = await user.save();

        // Email details
        const mailOptions = {
            from: 'wanigasinghebookcollection@gmail.com',
            to: user.email,
            subject: 'Welcome to the Wanigasinghe Books Collection!',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
              <h2 style="color: #4CAF50;">Hello ${user.firstName} ${user.lastName}</h2>
              <p>Thank you for registering with us. We are excited to have you onboard and hope you enjoy your time here!</p>
              <p>Your login credentials are as follows:</p>
              <ul style="list-style-type: none; margin-right: 20px">
                <li><strong>User name:</strong> ${user.email}</li>
                <li><strong>Password:</strong> ${user.password}</li>
              </ul>
              <p>Feel free to explore our bookstore and let us know if you need any assistance.</p>
             <p style="font-size: 14px; color: #555;margin:20px 0 0 0"; line-height: 0;>Best regards,</p>
                     <p style="font-size: 14px; color: #555;margin:0">Kamindu Gayantha,</p>
                      <p style="font-size: 14px; color: #555;margin:0">System Administrator,</p>
                    <p style="font-size: 14px; color: #555;margin:0">Wanigasinghe Books Collection</p>
                    <div>
                        <img src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png" alt="Company Logo" width="170" />
                    </div>
                    <p style="font-size: 12px; color: red;margin-top: 20px;">This is an automated email. Please do not reply to this email.</p>
            </div>`
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
            if (users[0].isActive === true) {
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
                        isFirstLogin: users[0].isFirstLogin,
                        profileImage: users[0].profileImage
                    }
                });
            } else {
                return res.status(401).json({ success: false, message: "Account is inactive. Please contact the administrator" });
            }
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
                isFirstLogin: user.isFirstLogin,
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

router.route("/").get(async (req, res) => {
    try {
        // Extract query parameters
        const { page = 0, per_page = 10, search = '', sort = '_id', direction = 'asc' } = req.query;

        // Convert page and per_page to integers
        const pageNumber = parseInt(page);
        const pageSize = parseInt(per_page);

        // Define sort object
        const sortOrder = direction === 'desc' ? -1 : 1; // descending (-1) or ascending (1)
        const sortObj = {};
        sortObj[sort] = sortOrder;

        // Build search query
        let searchQuery = {};

        // If a search term is provided, search by bookName
        if (search) {
            searchQuery.firstName = new RegExp(search, 'i'); // Case-insensitive search
        }

        // Fetch total number of matching products
        const total = await UserModel.countDocuments(searchQuery);

        // Fetch paginated and sorted products
        const products = await UserModel.find(searchQuery)
            .sort(sortObj)
            .skip(pageNumber * pageSize)
            .limit(pageSize);

        // Calculate total pages
        const totalPages = Math.ceil(total / pageSize);

        // Build the response
        const response = {
            pagination: {
                page: pageNumber,
                size: pageSize,
                total: total,
                totalPages: totalPages
            },
            result: products
        };

        res.json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
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

router.route("/inactive/:id").put(async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, {
            isActive: req.body.status
        }, { new: true });

        if (req.body.status === false) {
            // Email details
            const mailOptions = {
                from: 'wanigasinghebookcollection@gmail.com',
                to: user.email,
                subject: 'Account Deactivation',
                html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Hello ${user.firstName} ${user.lastName}</h2>
                    <p>We regret to inform you that your account has been deactivated. If you have any questions, please contact the administrator.</p>
                    <p>Thank you for being a part of the Wanigasinghe Books Collection.</p>
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
                res.json(user);
            });
        }
        else {
            // Email details
            const mailOptions = {
                from: 'wanigasinghebookcollection@gmail.com',
                to: user.email,
                subject: 'Account Activation',
                html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #4CAF50;">Hello ${user.firstName} ${user.lastName}</h2>
                    <p>We are pleased to inform you that your account has been reactivated. You can now access your account and continue to enjoy our services.</p>
                    <p>Continue to explore our bookstore and let us know if you need any assistance.</p>
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
                res.json(user);
            });
        }


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.route("/password-reset/:id").put(async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (user.password === req.body.currentPassword) {
            if (req.body.newPassword === req.body.reNewPassword) {
                if (user.isFirstLogin === true) {
                    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                        password: req.body.newPassword,
                        isFirstLogin: false
                    }, { new: true });
                    res.status(200).json({
                        message: 'Password updated successfully'
                    });

                } else {
                    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
                        password: req.body.newPassword
                    }, { new: true });
                    res.status(200).json({
                        message: 'Password updated successfully'
                    });
                }
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