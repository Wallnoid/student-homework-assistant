"use client";
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import MarkDownConverter from '@/shared/components/MarkDownConverter/MarkDownConverter';
import { useSpeechToText } from '@/shared/hooks/useSpeechToText.hook';
import { simplePrompt } from '@/shared/services/simplePrompt.service';
import { PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { MicrophoneIcon, SparklesIcon, StopIcon } from '@heroicons/react/24/solid';
import { use } from 'chai';
import React, { useEffect, useRef, useState } from 'react';
import { start } from 'repl';

export type InputIAForEditorProps = {
	onKeyDown: (e: React.KeyboardEvent) => void;
	content?: string;
	onChange: (val: string) => void;
	handleNewInput: () => void;
	handleAutoSubmit: () => void;

	handleDeleteIAInput: () => void;
}

const InputIAForEditor: React.FC<InputIAForEditorProps> = ({ onKeyDown, onChange, content, handleNewInput, handleAutoSubmit, handleDeleteIAInput }) => {

	const [value, setValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);
	const [response, setResponse] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [animated, setAnimated] = useState<boolean>(false);


	const { transcript, listening, resetTranscript, startListening, browserSupportsSpeechRecognition, stopListening } = useSpeechToText();


	const startSpeechToText = () => {
		resetTranscript();
		startListening!();

	}

	useEffect(() => {
		if (transcript) {
			setValue(transcript);
		}
	}, [transcript]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}

		if (content) {
			const response = content.replace('@InputIAForEditor', '')
			setResponse(response)
		}

	}, []);

	const handleSend = async () => {
		setLoading(true)
		setError(null)
		setAnimated(true)
		simplePrompt(value).then((res) => {

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
