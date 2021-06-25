const express = require('express');
const router = express.Router();

router.post('/webhook', async function (req, res, next) {
    console.log(req.body);
    res.status(200).send("RECEIVED");
});


module.exports = router;