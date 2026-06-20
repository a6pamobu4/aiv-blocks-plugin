import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button, TextControl, ToggleControl } from '@wordpress/components';

const defaultPlan = {
	name: '',
	price: '',
	description: '',
	features: [ '' ],
	buttonText: '',
	buttonUrl: '',
	highlighted: false,
};

export default function Edit( { attributes, setAttributes } ) {
	const { heading, intro, plans = [] } = attributes;
	const blockProps = useBlockProps( { className: 'aiv-pricing' } );

	const updatePlan = ( index, updates ) => {
		const nextPlans = [ ...plans ];
		nextPlans[ index ] = { ...nextPlans[ index ], ...updates };
		setAttributes( { plans: nextPlans } );
	};

	const updateFeature = ( planIndex, featureIndex, value ) => {
		const features = [ ...( plans[ planIndex ].features || [] ) ];
		features[ featureIndex ] = value;
		updatePlan( planIndex, { features } );
	};

	return (
		<section { ...blockProps }>
			<div className="aiv-pricing__inner">
				<div className="aiv-pricing__header">
					<RichText
						tagName="h2"
						className="aiv-pricing__heading"
						value={ heading }
						placeholder={ __( 'Pricing heading', 'aiv-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { heading: value } )
						}
					/>
					<RichText
						tagName="p"
						className="aiv-pricing__intro"
						value={ intro }
						placeholder={ __( 'Short intro', 'aiv-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { intro: value } )
						}
					/>
				</div>
				<div className="aiv-pricing__plans">
					{ plans.map( ( plan, planIndex ) => (
						<article
							className={ `aiv-pricing__plan${
								plan.highlighted ? ' is-highlighted' : ''
							}` }
							key={ planIndex }
						>
							<RichText
								tagName="h3"
								className="aiv-pricing__plan-name"
								value={ plan.name }
								placeholder={ __( 'Plan name', 'aiv-blocks' ) }
								onChange={ ( value ) =>
									updatePlan( planIndex, { name: value } )
								}
							/>
							<RichText
								tagName="p"
								className="aiv-pricing__price"
								value={ plan.price }
								placeholder={ __( 'Price', 'aiv-blocks' ) }
								onChange={ ( value ) =>
									updatePlan( planIndex, { price: value } )
								}
							/>
							<RichText
								tagName="p"
								className="aiv-pricing__description"
								value={ plan.description }
								placeholder={ __(
									'Description',
									'aiv-blocks'
								) }
								onChange={ ( value ) =>
									updatePlan( planIndex, {
										description: value,
									} )
								}
							/>
							<ul className="aiv-pricing__features">
								{ ( plan.features || [] ).map(
									( feature, featureIndex ) => (
										<li key={ featureIndex }>
											<RichText
												tagName="span"
												value={ feature }
												placeholder={ __(
													'Feature',
													'aiv-blocks'
												) }
												onChange={ ( value ) =>
													updateFeature(
														planIndex,
														featureIndex,
														value
													)
												}
											/>
											<Button
												variant="link"
												isDestructive
												onClick={ () => {
													const features =
														plan.features.filter(
															( item, index ) =>
																index !==
																featureIndex
														);
													updatePlan( planIndex, {
														features,
													} );
												} }
											>
												{ __( 'Remove', 'aiv-blocks' ) }
											</Button>
										</li>
									)
								) }
							</ul>
							<Button
								variant="secondary"
								onClick={ () =>
									updatePlan( planIndex, {
										features: [
											...( plan.features || [] ),
											'',
										],
									} )
								}
							>
								{ __( 'Add Feature', 'aiv-blocks' ) }
							</Button>
							<RichText
								tagName="span"
								className="aiv-pricing__button"
								value={ plan.buttonText }
								placeholder={ __(
									'Button text',
									'aiv-blocks'
								) }
								onChange={ ( value ) =>
									updatePlan( planIndex, {
										buttonText: value,
									} )
								}
								allowedFormats={ [] }
							/>
							<TextControl
								label={ __( 'Button URL', 'aiv-blocks' ) }
								value={ plan.buttonUrl || '' }
								onChange={ ( value ) =>
									updatePlan( planIndex, {
										buttonUrl: value,
									} )
								}
							/>
							<ToggleControl
								label={ __( 'Highlight plan', 'aiv-blocks' ) }
								checked={ !! plan.highlighted }
								onChange={ ( value ) =>
									updatePlan( planIndex, {
										highlighted: value,
									} )
								}
							/>
							<Button
								variant="link"
								isDestructive
								onClick={ () =>
									setAttributes( {
										plans: plans.filter(
											( item, index ) =>
												index !== planIndex
										),
									} )
								}
							>
								{ __( 'Remove plan', 'aiv-blocks' ) }
							</Button>
						</article>
					) ) }
				</div>
				<Button
					variant="secondary"
					onClick={ () =>
						setAttributes( { plans: [ ...plans, defaultPlan ] } )
					}
				>
					{ __( 'Add Plan', 'aiv-blocks' ) }
				</Button>
			</div>
		</section>
	);
}
