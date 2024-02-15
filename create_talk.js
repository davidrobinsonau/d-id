// POST https://docs.d-id.com/reference/createtalk
// This script will call the API to create a talk.
//
// Example output:
/* {
    id: 'tlk_3M7VK8w1H3yTj_20ZKt',
    created_at: '2023-10-23T03:00:14.699Z',
    created_by: 'auth0|6442eaa48',
    status: 'created',
    object: 'talk'
  }
*/

// API_KEY is stored as an environment variable. Add the below to your .zshrc or .bashrc file:
// export D_ID_API_KEY=your_api:key_here


// Use get_talks.js to see the results and to confirm its processing.

function send_api_request(_text) {
    // Set up the request
    const postData = JSON.stringify({
        script: {
            type: 'text',
            //subtitles: 'false', // description: 'user has no permission for subtitles'
            // Preferred voices
            // {"id":"en-AU-NatashaNeural","name":"Natasha","gender":"female","locale":"en-AU","language":"English (Australia)","access":"public","provider":"microsoft"}
            provider: { type: 'microsoft', voice_id: 'en-AU-NatashaNeural' },
            ssml: 'true',
            input: '<break time=\"300ms\"/>' + _text, // If we don't put a break time, the avatar's first frame is the start of the word, which looks aweful when the video is stopped on first frame and the word is October.
        },
        config: { result_format: 'mp4' },
        source_url: "https://create-images-results.d-id.com/api_docs/assets/amy.png",
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // Pull from environment variables
            'Authorization': 'Basic ' + Buffer.from(process.env.D_ID_API_KEY).toString('base64')
        },
        body: postData
    };

    // Send the request
    fetch('https://api.d-id.com/talks', options).then((response) => response.json())
        .then((json) => talks_response(json))
        .catch(error => {
            console.log(error)
        })

}

// Process the response and get the ID
function talks_response(json_output) {
    console.log(json_output);
    console.log("Talk ID: " + json_output.id);
    // Need to monitor this Talk ID to see when its ready.
    // wait 5 seconds then check the status
    setTimeout(function () { get_talk(json_output.id) }, 5000);

}

function get_talk(talk_id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // Pull from environment variables
            'Authorization': 'Basic ' + Buffer.from(process.env.D_ID_API_KEY).toString('base64')
        },
    };
    // Send the request
    fetch('https://api.d-id.com/talks/' + talk_id, options).then((response) => response.json())
        .then((json) => talks_id_response(json))
        .catch(error => {
            console.log(error)
        })
}

function talks_id_response(json_output) {
    console.log(json_output);
    console.log("Talk ID: " + json_output.id);
    console.log("Talk Status: " + json_output.status);
    console.log("Talk Result URL: " + json_output.result_url);
    // Need to monitor this Talk ID to see when its ready.
    // wait 5 seconds then check the status
    if (json_output.status == "done") {
        console.log("Talk is ready");
        console.log("Talk Result URL: " + json_output.result_url);
        // download the file
        download_file(json_output.result_url, json_output);
    } else {
        setTimeout(function () { get_talk(json_output.id) }, 5000);
    }

}

function download_file(url, json_output) {
    // https://stackoverflow.com/questions/11944932/how-to-download-a-file-with-node-js-without-using-third-party-libraries
    const fs = require('fs');
    const path = require('path');
    const https = require('https');
    const file = fs.createWriteStream(path.join(__dirname, 'output.mp4'));
    const request = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close();  // close() is async, call cb after close completes.
            console.log("File downloaded");
            console.log("File saved to: " + path.join(__dirname, 'output.mp4'));
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(path.join(__dirname, 'output.mp4')); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
}

send_api_request("This is a wonderful test of the D-ID API.");
