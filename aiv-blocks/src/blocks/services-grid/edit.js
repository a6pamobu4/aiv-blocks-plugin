import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	TextControl,
} from '@wordpress/components';

const defaultItem = {
	title: '',
	text: '',
	link: '',
};

export default function Edit( { attributes, setAttributes } ) {
	const { heading, intro, items = [], columns } = attributes;
	const blockProps = useBlockProps( {
		className: `aiv-services aiv-services--columns-${ columns }`,
	} );

	const updateItem = ( index, updates ) => {
		const nextItems = [ ...items ];
		nextItems[ index ] = { ...nextItems[ index ], ...updates };
		setAttributes( { items: nextItems } );
	};

	const removeItem = ( index ) => {
		setAttributes( {
			items: items.filter( ( item, itemIndex ) => itemIndex !== index ),
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Grid Settings', 'aiv-blocks' ) }>
					<RangeControl
						label={ __( 'Columns', 'aiv-blocks' ) }
						value={ columns }
						min={ 2 }
						max={ 4 }
						onChange={ ( value ) =>
							setAttributes( { columns: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="aiv-services__inner">
					<div className="aiv-services__header">
						<RichText
							tagName="h2"
							className="aiv-services__heading"
							value={ heading }
							placeholder={ __(
								'Services heading',
								'aiv-blocks'
							) }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
						/>
						<RichText
							tagName="p"
							className="aiv-services__intro"
							value={ intro }
							placeholder={ __( 'Short intro', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { intro: value } )
							}
						/>
					</div>
					<ul className="aiv-services__list">
						{ items.map( ( item, index ) => (
							<li className="aiv-services__item" key={ index }>
								<RichText
									tagName="h3"
									className="aiv-services__item-title"
									value={ item.title }
									placeholder={ __(
										'Service title',
										'aiv-blocks'
									) }
									onChange={ ( value ) =>
										updateItem( index, { title: value } )
									}
								/>
								<RichText
									tagName="p"
									className="aiv-services__item-text"
									value={ item.text }
									placeholder={ __(
										'Service description',
										'aiv-blocks'
									) }
									onChange={ ( value ) =>
										updateItem( index, { text: value } )
									}
								/>
								<TextControl
									label={ __(
										'Optional Link URL',
										'aiv-blocks'
									) }
									value={ item.link || '' }
									onChange={ ( value ) =>
										updateItem( index, { link: value } )
									}
								/>
								<Button
									variant="link"
									isDestructive
									onClick={ () => removeItem( index ) }
								>
									{ __( 'Remove service', 'aiv-blocks' ) }
								</Button>
							</li>
						) ) }
					</ul>
					<Button
						variant="secondary"
						onClick={ () =>
							setAttributes( {
								items: [ ...items, defaultItem ],
							} )
						}
					>
						{ __( 'Add Service', 'aiv-blocks' ) }
					</Button>
				</div>
			</section>
		</>
	);
}
