"use client";
import React, { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";


export type CustomColorPickerProps = {

	initialColor: string // The initial color to be displayed in the color picker
	// This is the color that will be used when the component is first rendered

	onChange: (color: string) => void // Callback function that will be called when the color changes
	// This function will receive the new color as a string when the user selects a different color
	// It allows the parent component to update its state or perform actions based on the selected color
	// This is useful for updating the UI or saving the selected color in a database
	// It is a required prop, meaning the parent component must provide this function when using the
}

/*
This component is a custom color picker that allows users to select a color.
It uses the HexColorPicker from the react-colorful library to provide a user-friendly interface for
selecting colors.
It accepts an initial color and a callback function that is called whenever the color changes.
*/
const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ onChange, initialColor }) => {
	// State to hold the currently selected color
	// It is initialized with the initialColor prop passed to the component
	const [color, setColor] = useState(initialColor);

	// Effect to call the onChange callback whenever the color changes
	// This ensures that the parent component receives the updated color whenever the user selects a new color
	useEffect(() => {
		onChange(color);
	}, [color]);

	return <HexColorPicker color={color} onChange={setColor} />;
};

export default CustomColorPicker;
