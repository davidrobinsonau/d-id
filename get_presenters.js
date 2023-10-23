// https://docs.d-id.com/reference/getpresenters
// This script will call the API to get the list of presenters then format the response to be more readable
// node ./get_presenters.js

// API_KEY is stored as an environment variable. Add the below to your .zshrc or .bashrc file:
// export D_ID_API_KEY=your_api:key_here

// Example output:
/*   "presenters": [
    {
        "presenter_id": "amy-Aq6OmGZnMt",
        "created_at": "2023-10-04T11:40:08.194Z",
        "thumbnail_url": "https://clips-presenters.d-id.com/amy/Aq6OmGZnMt/Vcq0R4a8F0/thumbnail.png",
        "preview_url": "https://clips-presenters.d-id.com/amy/Aq6OmGZnMt/Vcq0R4a8F0/preview.mp4",
        "driver_id": "Vcq0R4a8F0",
        "image_url": "https://clips-presenters.d-id.com/amy/Aq6OmGZnMt/Vcq0R4a8F0/image.png",
        "gender": "female",
        "model_url": "s3://d-id-clips-drivers-prod/amy/Aq6OmGZnMt/generator.pt",
        "modified_at": "2023-10-04T11:40:08.194Z",
        "owner_id": ""
      },
*/

// Import required libraries
const https = require('https');

// Set up the request
const options = {
    hostname: 'api.d-id.com',
    port: 443,
    path: '/clips/presenters',
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

