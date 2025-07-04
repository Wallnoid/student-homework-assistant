"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type MarkDownConverterProps = {
	content: string; // The markdown content to be converted
	// This is the markdown text that will be rendered as HTML
	animated?: boolean; // If true, the content will be displayed with a typing animation
	// This allows for a dynamic display of the content, simulating a typing effect
	speed?: number; // The speed of the typing animation in milliseconds
	// This controls how fast the content appears on the screen
	// A lower value means faster typing, while a higher value means slower typing
	// Default is 15 milliseconds per character
}

/**
 * This component is a markdown converter that can be used throughout the application.
 * It allows for different styles, sizes, and functionalities based on the props passed to it.
 * It uses the Markdown component from react-markdown and applies custom styles based on the variant and other props.
 */
const MarkDownConverter = React.memo((props: MarkDownConverterProps) => {

	// Destructure the props for easier access
	// This allows us to use content, speed, and animated directly without needing to access props
	const { content, speed = 15, animated } = props;

	// State to hold the currently displayed text
	// This will be updated as the content is animated or set directly if animated is false
	// It starts as an empty string and will be filled with the content based on the animation
	const [displayedText, setDisplayedText] = useState('');


	// Memoize the content to avoid unnecessary re-renders
	// This ensures that the content is only recalculated when it changes, improving performance
	useEffect(() => {
		if (!animated) {
			setDisplayedText(content);
			return;
		}

		// If animated is true, we will display the content with a typing effect
		// This simulates a typing effect by gradually revealing the content character by character
		// We use a setInterval to update the displayed text at the specified speed
		let i = 0;
		const interval = setInterval(() => {
			setDisplayedText(content.slice(0, i + 1));
			i++;
			if (i >= content.length) {
				clearInterval(interval)

			};
		}, speed);

		return () => clearInterval(interval);
	}, [content, speed]);

	return (
		<div className="prose prose-sm max-w-none [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!shadow-none">
			<Markdown
				children={displayedText}
				remarkPlugins={[remarkGfm]}
				components={{
					code({ children, className, ...rest }) {
						const match = /language-(\w+)/.exec(className || '');
						const language = match ? match[1] : 'plaintext';

						return match ? (
							<SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, '')}
								language={language}
								style={prism}
							/>
						) : (
							<code {...rest} className={`${className} text-black`} >
								{children}
							</code>
						)
					}
				}}
			/>
		</div>
	);
});

export default React.memo(MarkDownConverter);
