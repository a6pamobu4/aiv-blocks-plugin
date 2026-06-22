import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const variantOptions = [
	{ label: __( 'Default', 'aiv-blocks' ), value: 'default' },
	{ label: __( 'Muted', 'aiv-blocks' ), value: 'muted' },
	{ label: __( 'Accent', 'aiv-blocks' ), value: 'accent' },
];

const spacingOptions = [
	{ label: __( 'Small', 'aiv-blocks' ), value: 'sm' },
	{ label: __( 'Medium', 'aiv-blocks' ), value: 'md' },
	{ label: __( 'Large', 'aiv-blocks' ), value: 'lg' },
	{ label: __( 'Extra Large', 'aiv-blocks' ), value: 'xl' },
];

const widthOptions = [
	{ label: __( 'Default', 'aiv-blocks' ), value: 'default' },
	{ label: __( 'Wide', 'aiv-blocks' ), value: 'wide' },
	{ label: __( 'Full', 'aiv-blocks' ), value: 'full' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { variant, spacing, maxWidth } = attributes;
	const blockProps = useBlockProps( {
		className: `aiv-section aiv-section--${ variant } aiv-section--spacing-${ spacing } aiv-section--width-${ maxWidth }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Section Settings', 'aiv-blocks' ) }>
					<SelectControl
						label={ __( 'Variant', 'aiv-blocks' ) }
						value={ variant }
						options={ variantOptions }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<SelectControl
						label={ __( 'Spacing', 'aiv-blocks' ) }
						value={ spacing }
						options={ spacingOptions }
						onChange={ ( value ) =>
							setAttributes( { spacing: value } )
						}
					/>
					<SelectControl
						label={ __( 'Max Width', 'aiv-blocks' ) }
						value={ maxWidth }
						options={ widthOptions }
						onChange={ ( value ) =>
							setAttributes( { maxWidth: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<div className="aiv-section__inner">
					<InnerBlocks />
				</div>
			</section>
		</>
	);
}
