"use client";
import { Button } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/button';
import React from 'react';

export type CustomButtonProps = {

	// button appearance variant
	variant?: 'filled' | 'outlined' | 'text'

	// This is the size of the button
	size?: 'sm' | 'md' | 'lg'

	//button content (required)
	label: string

	//color that the button will have
	backgroundColor?: color | 'none'

	//circular button
	roundedFull?: boolean

	//full width
	fullWidth?: boolean

	//function to be executed when the button is activated
	onClick: () => void

}

const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'filled', size = 'md', label, backgroundColor, onClick, roundedFull = false, fullWidth = false }) => {



	const styleOptions = {
		filled: 'bg-gradient-to-br from-primary to-secondary',
		outlined: 'bg-transparent border border-primary bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text',
		text: 'bg-transparent bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text'

	}


	if (backgroundColor && backgroundColor != 'none') {
		return (
			<Button
				fullWidth={fullWidth}
				onClick={onClick}
				variant={variant}
				size={size}
				color={backgroundColor}
				className={`${roundedFull ? 'rounded-full' : ''}`}
			>
				{label}
			</Button>
		)

	}


	return (
		<Button
			fullWidth={fullWidth}
			onClick={onClick}
			variant={variant}
			size={size}
			className={`${styleOptions[variant]} ${roundedFull ? 'rounded-full' : ''} `}


		>
			{label}
		</Button>
	);
};

export default CustomButton;
