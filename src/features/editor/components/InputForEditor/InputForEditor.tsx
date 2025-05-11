"use client";
import React from 'react';

export type InputForEditorProps = {
	value: string;
	onChange: (val: string) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	inputRef?: (el: HTMLTextAreaElement | null) => void;
}

const InputForEditor: React.FC<InputForEditorProps> = ({ value, onChange, onKeyDown, inputRef }) => {
	return (
		<textarea
			ref={inputRef}
			className='text-lg overflow-hidden text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none py-1'
			placeholder='Escribe, presiona "Espacio" para la IA'
			value={value}
			onChange={(e) => {
				onChange(e.target.value)
			}}

			onKeyDown={onKeyDown}

			rows={1}
			onInputCapture={(e) => {
				const target = e.target as HTMLTextAreaElement;
				target.style.height = 'auto';
				target.style.height = `${target.scrollHeight}px`;
			}
			}
		/>
	);
};

export default InputForEditor;
