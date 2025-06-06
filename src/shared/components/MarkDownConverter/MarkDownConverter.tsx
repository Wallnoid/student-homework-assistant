"use client";
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type MarkDownConverterProps = {
	content: string;
	animated?: boolean;
	speed?: number; // opcional: velocidad en ms por carácter
}

const MarkDownConverter: React.FC<MarkDownConverterProps> = ({ content, speed = 15, animated }) => {
	const [displayedText, setDisplayedText] = useState('');


	useEffect(() => {
		if (!animated) {
			setDisplayedText(content);
			return;
		}

		let i = 0;
		const interval = setInterval(() => {
			setDisplayedText(content.slice(0, i + 1));
			i++;
			if (i >= content.length) clearInterval(interval);
		}, speed);

		return () => clearInterval(interval);
	}, [content, speed]);

	return (
		<div className="prose prose-sm max-w-none [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!shadow-none">
			<Markdown
				children={displayedText}
				components={{
					code({ children, className, ...rest }) {
						const match = /language-(\w+)/.exec(className || '')
						return match ? (
							<SyntaxHighlighter
								{...rest}
								PreTag="div"
								children={String(children).replace(/\n$/, '')}
								language={match[1]}
								style={prism}
							/>
						) : (
							<code {...rest} className={className}>
								{children}
							</code>
						)
					}
				}}
			/>
		</div>
	);
};

export default MarkDownConverter;
