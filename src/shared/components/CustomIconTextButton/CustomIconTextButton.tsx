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

	//function to be executed when the button is activated
	onClick: () => void
}

const CustomIconTextButton: React.FC<CustomIconTextButtonProps> = ({ variant = 'filled', size = 'md', children, backgroundColor, onClick, roundedFull = false, text }) => {

	const styleOptions = {
		filled: 'bg-gradient-to-br from-primary to-secondary',
		outlined: 'bg-transparent border border-primary  text-primary',
		text: 'bg-transparent text-primary'

	}


	if (backgroundColor && backgroundColor != 'none') {
		return (
			<Button
				onClick={onClick}
				variant={variant}
				size={size}
				color={backgroundColor}
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


		>
			{children} {text}
		</Button>
	);
};

export default CustomIconTextButton;
