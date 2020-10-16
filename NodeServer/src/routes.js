const Users = require('./models/User');
const bcryptjs = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkUserExists(uemail) {
    const userExists = await Users.findOne({ email: uemail });
    return userExists;
}

async function checkUNameExists(uName) {
    const userExists = await Users.findOne({ userName: uName });
    return userExists;
}

router.post('/login', async function (req, res) {
    const user = await checkUserExists(req.body.email);
    if (!user) {
        return res.status(400).send({
            status: 400,
            message: 'User Not Found!',
            data: {},
        });
    }
    const pswdMatch = await bcryptjs.compare(req.body.password, user.password);
    if (pswdMatch) {
        const token = await jwt.sign(
            { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: user },
            process.env.JWT_SECRET
        );
        return res.status(200).send({
            status: 200,
            message: 'User Found!',
            data: { result: user, accessToken: token },
        });
    } else {
        return res.status(401).send({
            status: 401,
            message: 'Wrong Password!',
            data: {},
        });
    }
});

router.post('/signup', async function (req, res) {
    const result = await checkUserExists(req.body.emailid);

    if (result) {
        return res.status(401).send({
            status: 401,
            message: 'This email Id is already registered!',
            data: {},
        });
    }
    const result2 = await checkUNameExists(req.body.userName);

    if (result2) {
        return res.status(401).send({
            status: 401,
            message: 'This username is already taken',
            data: {},
        });
    }
    return res.status(200).send({
        status: 200,
        message: 'User registered!',
        data: {},
    });
});

module.exports = router;
