"use client";
import React from 'react';

export type InputBoxProps = {
	input: string; // The current value of the input box
	// This is the value that will be displayed in the input box
	setInput: (value: string) => void; // Function to update the input value
	// This function will be called whenever the input value changes
	// It allows the parent component to update its state or perform actions based on the input value

}

/**
 * This component is a custom input box that can be used throughout the application.
 * It allows users to enter text and automatically adjusts its height based on the content.
 * It uses a textarea element to provide a multi-line input experience.
 */
const InputBox: React.FC<InputBoxProps> = ({ input, setInput }) => {
	return (
		<textarea
			value={input}
			onChange={(e) => setInput(e.target.value)}
			className="text-base overflow-hidden h-fit text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none "
			placeholder="Ingresa tu mensaje..."
			rows={1}
			onInputCapture={(e) => {
				const target = e.target as HTMLTextAreaElement;
				target.style.height = 'auto';
				target.style.height = `${target.scrollHeight}px`;
			}}
		/>
	);
};

export default InputBox;
