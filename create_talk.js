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
            ssml: 'false',
            input: _text,
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
        .then((json) => console.log(json))
        .catch(error => {
            console.log(error)
        })

}

send_api_request("This is a test");
