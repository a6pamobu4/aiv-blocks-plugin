import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

const defaultItem = {
	question: '',
	answer: '',
};

export default function Edit( { attributes, setAttributes } ) {
	const { heading, items = [] } = attributes;
	const blockProps = useBlockProps( { className: 'aiv-faq' } );

	const updateItem = ( index, updates ) => {
		const nextItems = [ ...items ];
		nextItems[ index ] = { ...nextItems[ index ], ...updates };
		setAttributes( { items: nextItems } );
	};

	return (
		<section { ...blockProps }>
			<div className="aiv-faq__inner">
				<RichText
					tagName="h2"
					className="aiv-faq__heading"
					value={ heading }
					placeholder={ __( 'FAQ heading', 'aiv-blocks' ) }
					onChange={ ( value ) =>
						setAttributes( { heading: value } )
					}
				/>
				<div className="aiv-faq__items">
					{ items.map( ( item, index ) => (
						<details className="aiv-faq__item" open key={ index }>
							<summary className="aiv-faq__question">
								<RichText
									tagName="span"
									value={ item.question }
									placeholder={ __(
										'Question',
										'aiv-blocks'
									) }
									onChange={ ( value ) =>
										updateItem( index, { question: value } )
									}
								/>
							</summary>
							<RichText
								tagName="div"
								className="aiv-faq__answer"
								value={ item.answer }
								placeholder={ __( 'Answer', 'aiv-blocks' ) }
								onChange={ ( value ) =>
									updateItem( index, { answer: value } )
								}
							/>
							<Button
								variant="link"
								isDestructive
								onClick={ () =>
									setAttributes( {
										items: items.filter(
											( faqItem, itemIndex ) =>
												itemIndex !== index
										),
									} )
								}
							>
								{ __( 'Remove FAQ', 'aiv-blocks' ) }
							</Button>
						</details>
					) ) }
				</div>
				<Button
					variant="secondary"
					onClick={ () =>
						setAttributes( { items: [ ...items, defaultItem ] } )
					}
				>
					{ __( 'Add FAQ', 'aiv-blocks' ) }
				</Button>
			</div>
		</section>
	);
}
