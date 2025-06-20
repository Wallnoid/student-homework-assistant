import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";




export const useSpeechToText = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,

    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.warn("Browser doesn't support speech recognition.");
        return {
            transcript: "",
            listening: false,
            resetTranscript: () => { },
            browserSupportsSpeechRecognition: false
        };
    }


    const startListening = () => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({ continuous: true });
        }
    }

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