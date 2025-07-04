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

	//loading state
	loading?: boolean

	// enable disable button
	disabled?: boolean


}

/*This component is a custom button that can be used throughout the application.
It allows for different styles, sizes, and functionalities based on the props passed to it.
It uses the Button component from Material Tailwind and applies custom styles based on the variant and other props.
*/
const CustomButton: React.FC<CustomButtonProps> = ({ variant = 'filled', size = 'md', label, backgroundColor, onClick, roundedFull = false, fullWidth = false, loading = false, disabled = false }) => {


	// Define the style options for the button based on the variant
	// This object maps the variant to the corresponding Tailwind CSS classes
	const styleOptions = {
		filled: 'bg-gradient-to-br from-primary to-secondary',
		outlined: 'bg-transparent border border-primary bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text',
		text: 'bg-transparent bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text'

	}


	// If a background color is provided and it is not 'none', use the Button component with the specified color
	// This allows for a solid color button with the specified background color
	if (backgroundColor && backgroundColor != 'none') {
		return (
			<Button
				fullWidth={fullWidth}
				onClick={onClick}
				variant={variant}
				size={size}
				color={backgroundColor}
				disabled={disabled}
				loading={loading}
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
			className={`${styleOptions[variant]} ${roundedFull ? 'rounded-full' : ''}  flex items-center justify-center`}
			disabled={disabled}
			loading={loading}



		>
			{label}
		</Button>
	);
};

export default CustomButton;
