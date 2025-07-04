"use client";
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import MarkDownConverter from '@/shared/components/MarkDownConverter/MarkDownConverter';
import { useSpeechToText } from '@/shared/hooks/useSpeechToText.hook';
import { simplePrompt } from '@/shared/services/simplePrompt.service';
import { PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon, SparklesIcon, StopIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';


export type InputIAForEditorProps = {
	onKeyDown: (e: React.KeyboardEvent) => void; // Function to handle key down events, such as pressing Enter or Backspace
	// This function is called when a key is pressed down in the input field
	content?: string; // The content of the input field, which can be used to display previous AI responses
	// This is useful for showing the AI's response in the input field
	onChange: (val: string) => void; // Callback function to handle changes in the input value
	// This function is called when the input value changes, such as when the user types or
	handleNewInput: () => void; // Function to handle creating a new input
	// This function is called when the user submits the input, such as by pressing Enter or
	handleAutoSubmit: () => void; // Function to handle auto submission of the input value
	// This function is called to automatically submit the input value after a debounce period

	handleDeleteIAInput: () => void; // Function to handle deleting the AI input
	// This function is called when the user clicks the delete button on the AI input
}

// This component is used to handle AI inputs in the editor
// It allows the user to ask questions to the AI and receive responses
const InputIAForEditor: React.FC<InputIAForEditorProps> = ({ onKeyDown, onChange, content, handleNewInput, handleAutoSubmit, handleDeleteIAInput }) => {

	// State variables to manage the input value, response from the AI, loading state, error messages, and animation state
	// The value state holds the current input value entered by the user
	const [value, setValue] = useState<string>('');

	// The inputRef is used to focus the input field when the component mounts
	// It allows the user to start typing immediately without having to click on the input field
	const inputRef = useRef<HTMLInputElement>(null);

	// The response state holds the AI's response to the user's input
	// It is used to display the AI's response in the input field after the user submits a question
	const [response, setResponse] = useState<string | null>(null);

	// The loading state indicates whether the AI is currently processing the user's input
	// It is used to show a loading spinner while the AI is generating a response
	const [loading, setLoading] = useState<boolean>(false);

	// The error state holds any error messages that occur during the AI's response generation
	// It is used to display error messages to the user if something goes wrong while communicating with
	const [error, setError] = useState<string | null>(null);

	// The animated state is used to control the animation of the AI's response
	// It is set to true when the AI's response is being displayed, allowing for a smooth transition effect
	// This is useful for enhancing the user experience by making the AI's response appear more dynamic
	const [animated, setAnimated] = useState<boolean>(false);

	// The useSpeechToText hook is used to handle speech-to-text functionality
	// It provides methods to start listening for speech input, reset the transcript, and check if the browser supports speech recognition
	// This allows the user to speak their questions instead of typing them, making it easier to interact with the AI
	// The transcript state holds the transcribed text from the user's speech input
	// The listening state indicates whether the speech recognition is currently active	
	const { transcript, listening, resetTranscript, startListening, browserSupportsSpeechRecognition, stopListening } = useSpeechToText();


	// This effect is used to handle the key down events in the input field
	// It listens for specific key presses such as Enter, ArrowUp, ArrowDown, and Space
	// When the user presses Enter, it calls the handleSend function to submit the input value	
	const startSpeechToText = () => {
		resetTranscript();
		startListening!();

	}


	// This effect is used to update the input value when the transcript changes
	// It sets the input value to the transcribed text from the user's speech input
	useEffect(() => {
		if (transcript) {
			setValue(transcript);
		}
	}, [transcript]);

	// This effect is used to focus the input field when the component mounts
	// It also processes the content prop to remove the '@InputIAForEditor' tags from the content
	// The content prop is expected to contain the AI's response, and this effect ensures that the input field is focused for user interaction
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}

		if (content) {
			const response = content.replace('@InputIAForEditor', '')
			setResponse(response)
		}

	}, []);

	// This function is called when the user presses a key in the input field
	// It checks for specific key presses and calls the appropriate callback functions
	const handleSend = async () => {
		setLoading(true)
		setError(null)
		setAnimated(true)
		simplePrompt(value).then((res) => {

			// Process the AI's response
			const response = "@InputIAForEditor" + res.data.reply + "@InputIAForEditor\n\n"

			setResponse(res.data.reply)
			setLoading(false)
			setValue('')
			onChange(response)
			handleNewInput()
			handleAutoSubmit()
		}).catch((err) => {
			setError(err.message)
			setLoading(false)
		})
	}

	if (response) {
		return (
			<div className='flex flex-col gap-2 bg-gray-200 rounded-r-xl rounded-l-lg p-2 my-5'>
				<div className='flex flex-row items-center gap-2 justify-end'>
					<XCircleIcon className='size-5 text-gray-500 cursor-pointer' onClick={() => {
						//eliminar el inputIA
						handleDeleteIAInput()
					}} />
				</div>
				<MarkDownConverter content={response} animated={animated} />
			</div>


		)
	}
	else {
		return (
			<div className='border border-primary rounded-r-xl rounded-l-lg flex flex-row items-center pl-2 justify-between py-0 '>
				<div className='flex flex-row items-center gap-3 w-full'>
					<SparklesIcon className='size-5 text-primary animate-pulse' />
					<input
						ref={inputRef}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={onKeyDown}
						className='text-lg overflow-hidden text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none py-0'
						placeholder='Preguntale algo a la IA !'

					/>

				</div>

				{
					value.length < 1 || listening ? (
						<CustomIconButton
							onClick={startSpeechToText}
							size='sm'
							disabled={!browserSupportsSpeechRecognition}
						>

							{listening ? (
								<StopIcon className='size-5 ' onClick={() => {
									stopListening!();
								}} />
							) : (
								<MicrophoneIcon className='size-5 ' />
							)}
						</CustomIconButton>
					) : (
						<CustomIconButton
							onClick={handleSend}
							size='sm'
							disabled={value.length < 1}
							loading={loading}
						>
							<PaperAirplaneIcon className='size-5' />
						</CustomIconButton>
					)
				}


			</div>
		);
	}
};

export default InputIAForEditor;
