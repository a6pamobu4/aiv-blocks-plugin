import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heading, intro, plans = [] } = attributes;
	const blockProps = useBlockProps.save( { className: 'aiv-pricing' } );

	return (
		<section { ...blockProps }>
			<div className="aiv-pricing__inner">
				{ ( heading || intro ) && (
					<div className="aiv-pricing__header">
						{ heading && (
							<RichText.Content
								tagName="h2"
								className="aiv-pricing__heading"
								value={ heading }
							/>
						) }
						{ intro && (
							<RichText.Content
								tagName="p"
								className="aiv-pricing__intro"
								value={ intro }
							/>
						) }
					</div>
				) }
				{ plans.length > 0 && (
					<div className="aiv-pricing__plans">
						{ plans.map( ( plan, index ) => (
							<article
								className={ `aiv-pricing__plan${
									plan.highlighted ? ' is-highlighted' : ''
								}` }
								key={ index }
							>
								{ plan.name && (
									<RichText.Content
										tagName="h3"
										className="aiv-pricing__plan-name"
										value={ plan.name }
									/>
								) }
								{ plan.price && (
									<RichText.Content
										tagName="p"
										className="aiv-pricing__price"
										value={ plan.price }
									/>
								) }
								{ plan.description && (
									<RichText.Content
										tagName="p"
										className="aiv-pricing__description"
										value={ plan.description }
									/>
								) }
								{ plan.features?.length > 0 && (
									<ul className="aiv-pricing__features">
										{ plan.features.map(
											( feature, featureIndex ) =>
												feature ? (
													<li key={ featureIndex }>
														<RichText.Content
															value={ feature }
														/>
													</li>
												) : null
										) }
									</ul>
								) }
								{ plan.buttonText && plan.buttonUrl && (
									<a
										className="aiv-pricing__button"
										href={ plan.buttonUrl }
									>
										<RichText.Content
											value={ plan.buttonText }
										/>
									</a>
								) }
							</article>
						) ) }
					</div>
				) }
			</div>
		</section>
	);
}
