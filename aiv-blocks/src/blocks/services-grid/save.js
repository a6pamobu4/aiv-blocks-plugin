import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heading, intro, items = [], columns } = attributes;
	const blockProps = useBlockProps.save( {
		className: `aiv-services aiv-services--columns-${ columns }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="aiv-services__inner">
				{ ( heading || intro ) && (
					<div className="aiv-services__header">
						{ heading && (
							<RichText.Content
								tagName="h2"
								className="aiv-services__heading"
								value={ heading }
							/>
						) }
						{ intro && (
							<RichText.Content
								tagName="p"
								className="aiv-services__intro"
								value={ intro }
							/>
						) }
					</div>
				) }
				{ items.length > 0 && (
					<ul className="aiv-services__list">
						{ items.map( ( item, index ) => (
							<li className="aiv-services__item" key={ index }>
								{ item.title && (
									<h3 className="aiv-services__item-title">
										{ item.link ? (
											<a
												className="aiv-services__item-link"
												href={ item.link }
											>
												<RichText.Content
													value={ item.title }
												/>
											</a>
										) : (
											<RichText.Content
												value={ item.title }
											/>
										) }
									</h3>
								) }
								{ item.text && (
									<RichText.Content
										tagName="p"
										className="aiv-services__item-text"
										value={ item.text }
									/>
								) }
							</li>
						) ) }
					</ul>
				) }
			</div>
		</section>
	);
}
