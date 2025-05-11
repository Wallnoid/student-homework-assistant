"use client";
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { MicrophoneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import React from 'react';

export type InputIAForEditorProps = {

}

const InputIAForEditor: React.FC<InputIAForEditorProps> = ({ }) => {
	return (
		<div className='border border-primary rounded-r-xl rounded-l-lg flex flex-row items-center pl-2 justify-between py-0 '>
			<div className='flex flex-row items-center gap-3 w-full'>
				<SparklesIcon className='size-5 text-primary animate-pulse' />
				<input

					className='text-lg overflow-hidden text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none py-0'
					placeholder='Preguntale algo a la IA !'

				/>

			</div>

			<CustomIconButton
				onClick={() => { }}
				size='sm'
			>
				<MicrophoneIcon className='size-5' />
			</CustomIconButton>

		</div>
	);
};

export default InputIAForEditor;
