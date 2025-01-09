const unirest = require("unirest");
const express = require('express');
const router = express.Router();

// GET method route
router.get('/', (req, res) => {
    res.send('GET request received');
});

// POST method route
router.post('/', (request, response) => {
    const data = request.body;

    var otpRequest = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    otpRequest.headers({
    "authorization": "QYrg3nNEohqxDA41ICbmuPUtXFz0JB8OVk2fdlZ7vWKiMcyaR6Dq9OHNAcTLkQ6SCguFt8mBzXRa1y2E"
    });

    data.variables_values = generateSixDigitRandomNumber().toString();
    try {
        otpRequest.form(data);

        otpRequest.end(function (otpResponse) {
        if (otpResponse.error) 
            data.Error = otpResponse.error;
    
        data.message = otpResponse.body
        console.log(otpResponse.body);
        response.send(data);
        });
      } catch (error) {
        console.log(oerror.message);
      }
});

function generateSixDigitRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = router;