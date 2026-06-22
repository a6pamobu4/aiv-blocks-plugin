import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	SelectControl,
	TextControl,
} from '@wordpress/components';

const variants = [
	{ label: __( 'Simple', 'aiv-blocks' ), value: 'simple' },
	{ label: __( 'Split', 'aiv-blocks' ), value: 'split' },
	{ label: __( 'Centered', 'aiv-blocks' ), value: 'centered' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		eyebrow,
		title,
		text,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		mediaId,
		mediaUrl,
		mediaAlt,
		variant,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `aiv-hero aiv-hero--${ variant }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Hero Settings', 'aiv-blocks' ) }>
					<SelectControl
						label={ __( 'Variant', 'aiv-blocks' ) }
						value={ variant }
						options={ variants }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<TextControl
						label={ __( 'Primary Button URL', 'aiv-blocks' ) }
						value={ primaryButtonUrl }
						onChange={ ( value ) =>
							setAttributes( { primaryButtonUrl: value } )
						}
					/>
					<TextControl
						label={ __( 'Secondary Button URL', 'aiv-blocks' ) }
						value={ secondaryButtonUrl }
						onChange={ ( value ) =>
							setAttributes( { secondaryButtonUrl: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Media', 'aiv-blocks' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									mediaId: media.id,
									mediaUrl: media.url,
									mediaAlt: media.alt || '',
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ mediaId }
							render={ ( { open } ) => (
								<Button variant="secondary" onClick={ open }>
									{ mediaUrl
										? __( 'Replace Image', 'aiv-blocks' )
										: __( 'Choose Image', 'aiv-blocks' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ mediaUrl && (
						<Button
							variant="link"
							isDestructive
							onClick={ () =>
								setAttributes( {
									mediaId: undefined,
									mediaUrl: '',
									mediaAlt: '',
								} )
							}
						>
							{ __( 'Remove Image', 'aiv-blocks' ) }
						</Button>
					) }
				</PanelBody>
			</InspectorControls>

			<section { ...blockProps }>
				<div className="aiv-hero__inner">
					<div className="aiv-hero__content">
						<RichText
							tagName="p"
							className="aiv-hero__eyebrow"
							value={ eyebrow }
							placeholder={ __( 'Eyebrow', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { eyebrow: value } )
							}
						/>
						<RichText
							tagName="h1"
							className="aiv-hero__title"
							value={ title }
							placeholder={ __( 'Hero title', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
						/>
						<RichText
							tagName="p"
							className="aiv-hero__text"
							value={ text }
							placeholder={ __( 'Intro text', 'aiv-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( { text: value } )
							}
						/>
						<div className="aiv-hero__actions">
							<RichText
								tagName="span"
								className="aiv-hero__button aiv-hero__button--primary"
								value={ primaryButtonText }
								placeholder={ __(
									'Primary action',
									'aiv-blocks'
								) }
								onChange={ ( value ) =>
									setAttributes( {
										primaryButtonText: value,
									} )
								}
								allowedFormats={ [] }
							/>
							<RichText
								tagName="span"
								className="aiv-hero__button aiv-hero__button--secondary"
								value={ secondaryButtonText }
								placeholder={ __(
									'Secondary action',
									'aiv-blocks'
								) }
								onChange={ ( value ) =>
									setAttributes( {
										secondaryButtonText: value,
									} )
								}
								allowedFormats={ [] }
							/>
						</div>
					</div>
					{ mediaUrl && (
						<figure className="aiv-hero__media">
							<img src={ mediaUrl } alt={ mediaAlt } />
						</figure>
					) }
				</div>
			</section>
		</>
	);
}
