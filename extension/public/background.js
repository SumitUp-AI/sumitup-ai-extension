// Background.js file for Chrome Extension
let mediaRecorder = null
let mediaStream = null
let audioChunks = []

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "START_RECORDING") {
        await startRecordingAudio()
        sendResponse({started: true})
    }

    if (message.type === "STOP_RECORDING") {
        await stopRecordingAudio()
        sendResponse({stopped: true})
    }

    return true
})
async function startRecordingAudio() {
    try {
        console.log("Attempting to start recording")
        mediaStream = await chrome.tabCapture.capture({
            audio: true,
            video: false
        })

        if (!mediaStream) {
            console.error("Error while recording")
            return
        }
        console.log("Audio captured successfully!");

        // Setup MediaRecorder
        mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: "audio/webm"
        });

        audioChunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) audioChunks.push(e.data);
        };

        mediaRecorder.onstop = async () => {
            console.log("Recording stopped.");

            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

            console.log("Audio Blob:", audioBlob);

            // Optional: Save it locally (for testing)
            saveAudioToLocal(audioBlob);
        };

        mediaRecorder.start();
        console.log("Recording started.");
    }
    catch (error) {
        console.error("Error while starting recording", error)
    }
}

async function stopRecordingAudio() {
//     Function signature
}

function saveAudioToLocal() {

}