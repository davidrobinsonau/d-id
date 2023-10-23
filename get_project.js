// GET d-id studio created project details - deep dive to get additional information on a generated project and understand the avatars used.s
// This script will call the API to get the list of actors and display on screen.

// API_KEY is stored as an environment variable. Add the below to your .zshrc or .bashrc file:
// export D_ID_API_KEY=your_api:key_here

// Import required libraries
const https = require('https');

// Set up the request
const options = {
    hostname: 'api.d-id.com',
    port: 443,
    path: 'https://api.d-id.com/projects/prj_kxClB_juJwU4_iWLpIKLT',
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
        process.stdout.write(JSON.stringify(JSON.parse(d), null, 2));
    })
}
)

req.on('error', error => {
    console.error(error)
}
)

req.end()

