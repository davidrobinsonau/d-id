// https://docs.d-id.com/reference/overview-2
// Use the premium presenters to create an avatar clip

// API_KEY is stored as an environment variable. Add the below to your .zshrc or .bashrc file:
// export D_ID_API_KEY=your_api:key_here

// node ./create_clips.js


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
        //presenter_config: { crop: { type: 'rectangle',"rectangle": {
        // "bottom": 1,
        // "right": 1,
        // "left": 1,
        // "top": 1
        //    }
        presenter_id: "amy-Aq6OmGZnMt",
        driver_id: "Vcq0R4a8F0"
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
    fetch('https://api.d-id.com/clips', options).then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            console.log(error)
        })

    // Error received:
    // {
    //  kind: 'PermissionError',
    //  description: 'user has no permission for clips:write'
    // }
    // Sent support request in - tried changing Auth to confirm its correct and received "{ message: 'Unauthorized' }"
    // Answer - I needed to upgrade plan to premium to use this endpoint.

}


send_api_request("This is a test");
