"use client";
import React, { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";


export type CustomColorPickerProps = {

	initialColor: string

	onChange: (color: string) => void
}

const CustomColorPicker: React.FC<CustomColorPickerProps> = ({ onChange, initialColor }) => {
	const [color, setColor] = useState(initialColor);

	useEffect(() => {
		onChange(color);
	}, [color]);

	return <HexColorPicker color={color} onChange={setColor} />;
};

export default CustomColorPicker;
