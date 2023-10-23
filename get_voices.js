// GET https://docs.d-id.com/reference/voices
// This script will call the API to get the list of voices available.

// Pending issue with pull due to:
// https://docs.d-id.com/discuss/6535deb658d3f00074e10ed5

// node ./get_voices.js

// API_KEY is stored as an environment variable. Add the below to your .zshrc or .bashrc file:
// export D_ID_API_KEY=your_api:key_here

// Import required libraries
const https = require('https');

// Set up the request
const options = {
    hostname: 'api.d-id.com',
    port: 443,
    path: 'https://api.d-id.com/tts/voices',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(process.env.D_ID_API_KEY).toString('base64')
    }
}

// Send the request
const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    console.log(res.headers)

    res.on('data', d => {
        process.stdout.write(d)
        // make d a JSON object and print pretty
        process.stdout.write(JSON.stringify(JSON.parse(d), null, 2));

    })
}
)

req.on('error', error => {
    console.error(error)
}
)

req.end()

