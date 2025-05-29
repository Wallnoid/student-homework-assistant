"use client";
import { IconButton, Spinner } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/button';
import React, { ReactNode } from 'react';

export type CustomIconButtonProps = {
	// button appearance variant
	variant?: 'filled' | 'outlined' | 'text'

	// This is the size of the button
	size?: 'sm' | 'md' | 'lg'

	//button content (required)
	children: ReactNode

	//color that the button will have
	backgroundColor?: color | 'none'

	//circular button
	roundedFull?: boolean

	//disabled button
	disabled?: boolean

	//loading button
	loading?: boolean



	//function to be executed when the button is activated
	onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void

}

const CustomIconButton: React.FC<CustomIconButtonProps> = ({ variant = 'filled', size = 'md', children, backgroundColor, onClick, roundedFull = false, disabled = false, loading = false }) => {


	const styleOptions = {
		filled: 'bg-gradient-to-br from-primary to-secondary',
		outlined: 'bg-transparent border border-primary  text-primary',
		text: 'bg-transparent text-primary'

	}


	if (backgroundColor && backgroundColor != 'none') {
		return (
			<IconButton
				onClick={onClick}
				variant={variant}
				size={size}
				color={backgroundColor}
				disabled={disabled}



				className={`${roundedFull ? 'rounded-full' : ''}`}
			>
				{
					loading ? (
						<Spinner className='size-5' />
					) : (
						children
					)
				}
			</IconButton>
		)

	}


	return (
		<IconButton
			onClick={onClick}
			variant={variant}
			size={size}
			className={`${styleOptions[variant]} ${roundedFull ? 'rounded-full' : ''}  flex items-center justify-center`}
			disabled={disabled}

		>
			{
				loading ? (
					<Spinner className='size-5' color="gray" />
				) : (
					children
				)
			}
		</IconButton>
	);
};

export default CustomIconButton;
