import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

const variants = [
	{ label: __( 'Default', 'aiv-blocks' ), value: 'default' },
	{ label: __( 'Muted', 'aiv-blocks' ), value: 'muted' },
	{ label: __( 'Accent', 'aiv-blocks' ), value: 'accent' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { title, text, buttonText, buttonUrl, variant } = attributes;
	const blockProps = useBlockProps( {
		className: `aiv-cta aiv-cta--${ variant }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'CTA Settings', 'aiv-blocks' ) }>
					<SelectControl
						label={ __( 'Variant', 'aiv-blocks' ) }
						value={ variant }
						options={ variants }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<TextControl
						label={ __( 'Button URL', 'aiv-blocks' ) }
						value={ buttonUrl }
						onChange={ ( value ) =>
							setAttributes( { buttonUrl: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="aiv-cta__inner">
					<div className="aiv-cta__content">
						<RichText
							tagName="h2"
							className="aiv-cta__title"
							value={ title }
							placeholder={ __( 'CTA title', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
						/>
						<RichText
							tagName="p"
							className="aiv-cta__text"
							value={ text }
							placeholder={ __( 'CTA text', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { text: value } )
							}
						/>
					</div>
					<RichText
						tagName="span"
						className="aiv-cta__button"
						value={ buttonText }
						placeholder={ __( 'Button text', 'aiv-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
						allowedFormats={ [] }
					/>
				</div>
			</section>
		</>
	);
}
