import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		eyebrow,
		title,
		text,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		mediaUrl,
		mediaAlt,
		variant,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `aiv-hero aiv-hero--${ variant }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="aiv-hero__inner">
				<div className="aiv-hero__content">
					{ eyebrow && (
						<RichText.Content
							tagName="p"
							className="aiv-hero__eyebrow"
							value={ eyebrow }
						/>
					) }
					{ title && (
						<RichText.Content
							tagName="h1"
							className="aiv-hero__title"
							value={ title }
						/>
					) }
					{ text && (
						<RichText.Content
							tagName="p"
							className="aiv-hero__text"
							value={ text }
						/>
					) }
					{ ( primaryButtonText || secondaryButtonText ) && (
						<div className="aiv-hero__actions">
							{ primaryButtonText && primaryButtonUrl && (
								<a
									className="aiv-hero__button aiv-hero__button--primary"
									href={ primaryButtonUrl }
								>
									<RichText.Content
										value={ primaryButtonText }
									/>
								</a>
							) }
							{ secondaryButtonText && secondaryButtonUrl && (
								<a
									className="aiv-hero__button aiv-hero__button--secondary"
									href={ secondaryButtonUrl }
								>
									<RichText.Content
										value={ secondaryButtonText }
									/>
								</a>
							) }
						</div>
					) }
				</div>
				{ mediaUrl && (
					<figure className="aiv-hero__media">
						<img src={ mediaUrl } alt={ mediaAlt || '' } />
					</figure>
				) }
			</div>
		</section>
	);
}
