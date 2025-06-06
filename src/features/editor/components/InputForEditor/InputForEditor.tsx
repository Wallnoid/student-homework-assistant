"use client";
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export type InputForEditorProps = {
	value: string;
	index: number;
	countInputs: number;
	onChange: (val: string) => void;
	onKeyDown: (e: React.KeyboardEvent) => void;
	inputRef?: (el: HTMLTextAreaElement | null) => void;
	onNavigateUp?: () => void;
	onNavigateDown?: () => void;
	onSplitLine?: (textBeforeCursor: string, textAfterCursor: string) => void;
	onBackspace?: () => void;
	name?: string;
	onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
	inputRefForm?: React.Ref<HTMLTextAreaElement>;
	handleAutoSubmit: () => void;
	handleActiveIAnote: (index: number) => void;
	handleActiveInput: (index: number) => void;
};

const InputForEditor: React.FC<InputForEditorProps> = ({
	value,
	index,
	countInputs,
	onChange,
	onKeyDown,
	inputRef,
	onNavigateUp,
	onNavigateDown,
	onSplitLine,
	name,
	onBlur,
	inputRefForm,
	handleAutoSubmit,
	handleActiveIAnote,
	handleActiveInput
}) => {
	const [hasFocus, setHasFocus] = useState(false);
	const [debounceChanged] = useDebounce(value, 500)


	useEffect(() => {
		if (debounceChanged) {
			handleAutoSubmit();
		}
	}, [debounceChanged]);


	const combinedRef = (el: HTMLTextAreaElement | null) => {
		if (inputRef) inputRef(el);
		if (typeof inputRefForm === 'function') {
			inputRefForm(el);
		} else if (inputRefForm && 'current' in inputRefForm) {
			(inputRefForm as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {

		if (e.key === 'ArrowUp' && onNavigateUp) {
			e.preventDefault();
			onNavigateUp();
			return;
		}
		if (e.key === 'ArrowDown' && onNavigateDown) {
			e.preventDefault();
			onNavigateDown();
			return;
		}
		if (e.key === 'Enter' && onSplitLine) {
			e.preventDefault();
			const textarea = e.target as HTMLTextAreaElement;
			const cursorPosition = textarea.selectionStart;
			const textBeforeCursor = value.substring(0, cursorPosition);
			const textAfterCursor = value.substring(cursorPosition);
			onSplitLine(textBeforeCursor, textAfterCursor);
			return;
		}

		if (e.key === ' ' && value.length === 0) {
			e.preventDefault();
			handleActiveIAnote(index);
		}

		onKeyDown(e);
	};

	return (
		<textarea
			ref={combinedRef}
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onBlur={onBlur}
			onKeyDown={handleKeyDown}
			onFocus={() => setHasFocus(true)}
			onBlurCapture={() => setHasFocus(false)}
			className='text-lg overflow-hidden text-gray-800 font-normal w-full border-none outline-none ring-0 focus:ring-0 focus:outline-none resize-none py-0'
			placeholder={hasFocus || (index === 0 && countInputs === 1) ? 'Escribe, presiona "Espacio" para la IA' : ''}
			rows={1}
			onInputCapture={(e) => {
				const target = e.target as HTMLTextAreaElement;
				target.style.height = 'auto';
				target.style.height = `${target.scrollHeight}px`;
			}}
		/>
	);
};

export default InputForEditor;
