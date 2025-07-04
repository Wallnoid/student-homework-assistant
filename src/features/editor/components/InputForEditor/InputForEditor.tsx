"use client";
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export type InputForEditorProps = {
	value: string; // The value of the textarea input
	index: number; // The index of the input in a list of inputs
	countInputs: number; // The total number of inputs in the list
	onChange: (val: string) => void; // Callback function to handle changes in the input value
	onKeyDown: (e: React.KeyboardEvent) => void; // Callback function to handle key down events
	// This function is called when a key is pressed down in the input field
	inputRef?: (el: HTMLTextAreaElement | null) => void;// Optional ref callback for the textarea element
	// This allows the parent component to access the textarea element directly
	onNavigateUp?: () => void; // Callback function to handle navigation up
	// This function is called when the user navigates up in the input list
	onNavigateDown?: () => void; // Callback function to handle navigation down
	// This function is called when the user navigates down in the input list
	onSplitLine?: (textBeforeCursor: string, textAfterCursor: string) => void; // Callback function to handle splitting the line
	// This function is called when the user presses Enter to split the line
	onBackspace?: () => void; // Callback function to handle backspace key press
	// This function is called when the user presses the backspace key
	name?: string; // The name attribute for the textarea input
	// This is used to identify the input in forms or when submitting data
	onBlur?: React.FocusEventHandler<HTMLTextAreaElement>; // Callback function to handle blur events
	// This function is called when the input loses focus
	inputRefForm?: React.Ref<HTMLTextAreaElement>; // Optional ref for the textarea element, can be a function or a React ref object
	// This allows the parent component to access the textarea element directly
	handleAutoSubmit: () => void; // Function to handle auto submission of the input value
	// This function is called to automatically submit the input value after a debounce period
	handleActiveIAnote: (index: number) => void; // Function to handle activating an AI note
	// This function is called when the user presses space on an empty input to activate an AI
	handleActiveInput: (index: number) => void; // Function to handle activating an input
};

/*
 * InputForEditor component is a reusable textarea input component for an editor.
 * It handles user input, key events, and integrates with AI functionality.
 * It supports navigation, splitting lines, and auto submission of input values.
 */

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

	// State to manage focus on the textarea input
	// This state is used to determine if the input has focus or not
	const [hasFocus, setHasFocus] = useState(false);

	// Debounce the value to avoid too frequent calls to handleAutoSubmit
	// This will wait for 500 milliseconds after the last change before calling handleAutoSubmit
	const [debounceChanged] = useDebounce(value, 500)


	// Call the handleAutoSubmit function when the debounced value changes
	// This ensures that the input value is submitted automatically after a delay
	// This is useful for reducing the number of API calls or processing when the user is typing
	useEffect(() => {
		if (debounceChanged) {
			handleAutoSubmit();
		}
	}, [debounceChanged]);


	// Combine the inputRef and inputRefForm into a single ref callback
	// This allows both the parent component and the form to access the textarea element
	// The combinedRef function will be called with the textarea element when it is mounted or unmounted
	// This is useful for managing focus, selection, or other DOM manipulations
	const combinedRef = (el: HTMLTextAreaElement | null) => {
		if (inputRef) inputRef(el);
		if (typeof inputRefForm === 'function') {
			inputRefForm(el);
		} else if (inputRefForm && 'current' in inputRefForm) {
			(inputRefForm as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
		}
	};

	// Handle key down events for the textarea input
	// This function checks for specific key presses and calls the appropriate callback functions
	const handleKeyDown = (e: React.KeyboardEvent) => {

		// If the input is empty and the user presses Backspace, call onBackspace if provided
		if (e.key === 'ArrowUp' && onNavigateUp) {
			e.preventDefault();
			// Prevent default behavior of the key press
			// This is useful for preventing scrolling or other default actions
			onNavigateUp();
			return;
		}

		// If the input is empty and the user presses ArrowDown, call onNavigateDown if provided
		// This allows the user to navigate through a list of inputs
		if (e.key === 'ArrowDown' && onNavigateDown) {
			e.preventDefault();
			onNavigateDown();
			return;
		}

		// If the input is empty and the user presses Enter, call onSplitLine if provided
		if (e.key === 'Enter' && onSplitLine) {
			e.preventDefault();
			const textarea = e.target as HTMLTextAreaElement;
			const cursorPosition = textarea.selectionStart;
			const textBeforeCursor = value.substring(0, cursorPosition);
			const textAfterCursor = value.substring(cursorPosition);
			onSplitLine(textBeforeCursor, textAfterCursor);
			return;
		}

		// If the input is empty and the user presses Space, call handleActiveIAnote if provided
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
