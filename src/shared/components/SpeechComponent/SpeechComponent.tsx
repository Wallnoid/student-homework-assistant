"use client";

import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechComponent: React.FC = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		// Esto garantiza que se monta SOLO en cliente
		setIsClient(true);
	}, []);

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition
	} = useSpeechRecognition();

	if (!isClient) return null; // o un loading spinner si quieres

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	return (
		<div>
			<p>Microphone: {listening ? 'on' : 'off'}</p>
			<button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
			<button onClick={SpeechRecognition.stopListening}>Stop</button>
			<button onClick={resetTranscript}>Reset</button>
			<p>{transcript}</p>
		</div>
	);
};

export default SpeechComponent;
