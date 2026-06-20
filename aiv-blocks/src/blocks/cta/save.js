import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, text, buttonText, buttonUrl, variant } = attributes;
	const blockProps = useBlockProps.save( {
		className: `aiv-cta aiv-cta--${ variant }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="aiv-cta__inner">
				<div className="aiv-cta__content">
					{ title && (
						<RichText.Content
							tagName="h2"
							className="aiv-cta__title"
							value={ title }
						/>
					) }
					{ text && (
						<RichText.Content
							tagName="p"
							className="aiv-cta__text"
							value={ text }
						/>
					) }
				</div>
				{ buttonText && buttonUrl && (
					<a className="aiv-cta__button" href={ buttonUrl }>
						<RichText.Content value={ buttonText } />
					</a>
				) }
			</div>
		</section>
	);
}
