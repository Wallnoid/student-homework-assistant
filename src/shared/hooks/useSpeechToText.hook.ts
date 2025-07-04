import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";



/** * Custom hook to manage speech-to-text functionality.
 * It provides methods to start and stop listening, as well as access the transcript and listening state.
 * @returns {Object} - Contains the speech recognition methods and state
 * @property {string} transcript - The transcribed text from speech recognition
 * @property {boolean} listening - Indicates whether the speech recognition is active
 * @property {function} resetTranscript - Function to reset the transcript
 */
export const useSpeechToText = () => {

    // Using the useSpeechRecognition hook from react-speech-recognition to manage speech recognition state
    // This hook provides the transcript, listening state, resetTranscript function, and browser support status
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,

    } = useSpeechRecognition();

    // Check if the browser supports speech recognition
    // If not, log a warning and return an object with default values
    if (!browserSupportsSpeechRecognition) {
        console.warn("Browser doesn't support speech recognition.");
        return {
            transcript: "",
            listening: false,
            resetTranscript: () => { },
            browserSupportsSpeechRecognition: false
        };
    }


    // Functions to start and stop listening for speech input
    // These functions use the SpeechRecognition API to control the speech recognition process
    const startListening = () => {
        console.log("Starting speech recognition...");
        console.log("Browser supports speech recognition:", browserSupportsSpeechRecognition);
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({ continuous: true });
        }
    }


    // Function to stop listening for speech input
    // This function uses the SpeechRecognition API to stop the speech recognition process
    const stopListening = () => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.stopListening();
        }
    }



    return {
        transcript,
        listening,
        resetTranscript,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition
    };
};