import { useState } from "react";

const PopUp = () => {
    const [recording, setRecording] = useState(false)

    const startRecording = async () => {
        setRecording(true)
        await chrome.runtime.sendMessage({type: "START_RECORDING"})
    }

    const stopRecording = async () => {
        setRecording(false)
        await chrome.runtime.sendMessage({type: "STOP_RECORDING"})
    }

    return (
        <>
            <div className="flex flex-col px-5 py-4">

            </div>
        </>
    )

}

export default PopUp