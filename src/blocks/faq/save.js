import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { heading, items = [] } = attributes;
	const blockProps = useBlockProps.save( { className: 'aiv-faq' } );

	return (
		<section { ...blockProps }>
			<div className="aiv-faq__inner">
				{ heading && (
					<RichText.Content
						tagName="h2"
						className="aiv-faq__heading"
						value={ heading }
					/>
				) }
				{ items.length > 0 && (
					<div className="aiv-faq__items">
						{ items.map( ( item, index ) => (
							<details className="aiv-faq__item" key={ index }>
								{ item.question && (
									<summary className="aiv-faq__question">
										<RichText.Content
											value={ item.question }
										/>
									</summary>
								) }
								{ item.answer && (
									<RichText.Content
										tagName="div"
										className="aiv-faq__answer"
										value={ item.answer }
									/>
								) }
							</details>
						) ) }
					</div>
				) }
			</div>
		</section>
	);
}
