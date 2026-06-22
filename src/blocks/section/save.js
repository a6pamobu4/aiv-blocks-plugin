import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { variant, spacing, maxWidth } = attributes;
	const blockProps = useBlockProps.save( {
		className: `aiv-section aiv-section--${ variant } aiv-section--spacing-${ spacing } aiv-section--width-${ maxWidth }`,
	} );

	return (
		<section { ...blockProps }>
			<div className="aiv-section__inner">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
