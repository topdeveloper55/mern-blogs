const Users = require('./models/User');
const express = require('express');
const router = express.Router();

async function checkUserExists(form) {
    const userExists = await Users.findOne({ email: form.email });
    console.log('user ', userExists);
    return userExists;
}

router.post('/login', async function (req, res) {
    const result = await checkUserExists(req.body);
    res.send(result);
    res.end();
});

module.exports = router;
