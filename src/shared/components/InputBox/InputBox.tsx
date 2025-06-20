"use client";
import React from 'react';

export type InputBoxProps = {
	input: string;
	setInput: (value: string) => void;

}

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
