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
    // Variable to store the received data
    let data = '';
    // Event handler for receiving data chunks
    // This is required due to the large size of the response from d-id
    res.on('data', (chunk) => {
        // Append the data chunk to the existing data
        data += chunk;
        // check is the data size matches the content-length header
        const sizeInBytes = Buffer.byteLength(data, 'utf8');
        const contentLength = res.headers['content-length'];
        console.log(`Received ${sizeInBytes} bytes of data`);
        console.log(`Content-Length: ${contentLength}`);
        if (sizeInBytes == contentLength) {
            console.log('All data received');
        }
    });
    // Event handler for the end of the response
    res.on('end', () => {
        // Calculate the size of the received data
        const sizeInBytes = Buffer.byteLength(data, 'utf8');
        console.log(`Return result size: ${sizeInBytes} bytes`);
        process.stdout.write(JSON.stringify(JSON.parse(data), null, 2));

    });
});
// Event handler for error handling
req.on('error', (error) => {
    console.error(error);
});

// End the request
/* In Node.js, after creating an HTTP request using the http.request() method, you need to call req.end()
to indicate that you have finished configuring the request and that it should be sent to the server.

The req.end() method does the following:
1. Sends the actual request to the server.
2. Marks the end of the request configuration and begins the process of sending the request.
3. Once the request has been sent, any further modifications or changes to the request are ignored.
It is important to note that req.end() must be called for the request to be actually sent, otherwise, 
the request will remain pending and will never be sent to the server.
*/

req.end();

