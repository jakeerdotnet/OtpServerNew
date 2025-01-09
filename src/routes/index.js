const unirest = require("unirest");
const express = require('express');
const router = express.Router();

// GET method route
router.get('/', (req, res) => {
    res.send('GET request received');
});

// POST method route
router.post('/', (req, res) => {
    const data = req.body;

    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    req.headers({
    "authorization": "QYrg3nNEohqxDA41ICbmuPUtXFz0JB8OVk2fdlZ7vWKiMcyaR6Dq9OHNAcTLkQ6SCguFt8mBzXRa1y2E"
    });

    data.variables_values = generateSixDigitRandomNumber().toString();
    req.form(data);

    req.end(function (res) {
    if (res.error) data.Error = res.error;

    data.Message = res.body
    console.log(res.body);
    });

    res.send(data);
});

function generateSixDigitRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = router;