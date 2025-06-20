"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export type MarkDownConverterProps = {
	content: string;
	animated?: boolean;
	speed?: number;
}

const MarkDownConverter = React.memo((props: MarkDownConverterProps) => {
	const { content, speed = 15, animated } = props;
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
