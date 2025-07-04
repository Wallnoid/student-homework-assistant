"use client";
import { Button } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/button';
import React, { ReactNode } from 'react';

export type CustomIconTextButtonProps = {
	// button appearance variant
	variant?: 'filled' | 'outlined' | 'text'

	// This is the size of the button
	size?: 'sm' | 'md' | 'lg'

	//button icon content (required)
	children: ReactNode

	//button text content (required)
	text: string

	//color that the button will have
	backgroundColor?: color | 'none'

	//circular button
	roundedFull?: boolean

	//if true, the button will have a loading state
	loading?: boolean

	//if true, the button will be disabled
	disabled?: boolean

	//function to be executed when the button is activated
	onClick: () => void
}

/*This component is a custom icon text button that can be used throughout the application.
It allows for different styles, sizes, and functionalities based on the props passed to it.
It uses the Button component from Material Tailwind and applies custom styles based on the variant and other props.
*/
const CustomIconTextButton: React.FC<CustomIconTextButtonProps> = ({ variant = 'filled', size = 'md', children, backgroundColor, onClick, roundedFull = false, text, loading = false, disabled = false }) => {

	// Define the style options for the button based on the variant
	// This object maps the variant to the corresponding Tailwind CSS classes
	const styleOptions = {
		filled: 'bg-gradient-to-br from-primary to-secondary',
		outlined: 'bg-transparent border border-primary  text-primary',
		text: 'bg-transparent text-primary'

	}


	// If a background color is provided and it is not 'none', use the Button component with the specified color
	// This allows for a solid color button with the specified background color
	if (backgroundColor && backgroundColor != 'none') {
		return (
			<Button
				onClick={onClick}
				variant={variant}
				size={size}
				color={backgroundColor}
				loading={loading}
				disabled={disabled}
				className={`${roundedFull ? 'rounded-full' : ''} flex items-center gap-2`}
			>
				{children} {text}
			</Button>
		)

	}


	return (
		<Button
			onClick={onClick}
			variant={variant}
			size={size}
			className={`${styleOptions[variant]} ${roundedFull ? 'rounded-full' : ''}  flex items-center justify-center gap-2`}
			loading={loading}
			disabled={disabled}


		>
			{loading ? '' : children} {text}
		</Button>
	);
};

export default CustomIconTextButton;
