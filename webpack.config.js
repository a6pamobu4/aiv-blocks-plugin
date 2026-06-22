const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const path = require( 'path' );
const fs = require( 'fs' );

const blocksDir = path.resolve( __dirname, 'src/blocks' );

const blockNames = fs
	.readdirSync( blocksDir, { withFileTypes: true } )
	.filter( ( entry ) => entry.isDirectory() )
	.map( ( entry ) => entry.name );

class BlockCssOutputPlugin {
	apply( compiler ) {
		compiler.hooks.thisCompilation.tap(
			'BlockCssOutputPlugin',
			( compilation ) => {
				const { Compilation } = compiler.webpack;

				compilation.hooks.processAssets.tap(
					{
						name: 'BlockCssOutputPlugin',
						stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
					},
					() => {
						blockNames.forEach( ( blockName ) => {
							this.moveAsset(
								compilation,
								`blocks/${ blockName }.css`,
								`blocks/${ blockName }/index.css`
							);
							this.moveAsset(
								compilation,
								`blocks/${ blockName }-rtl.css`,
								`blocks/${ blockName }/index-rtl.css`
							);
							this.moveAsset(
								compilation,
								`blocks/style-${ blockName }.css`,
								`blocks/${ blockName }/style-index.css`
							);
							this.moveAsset(
								compilation,
								`blocks/style-${ blockName }-rtl.css`,
								`blocks/${ blockName }/style-index-rtl.css`
							);
						} );
					}
				);
			}
		);
	}

	moveAsset( compilation, from, to ) {
		const asset = compilation.getAsset( from );

		if ( ! asset ) {
			return;
		}

		compilation.emitAsset( to, asset.source, asset.info );
		compilation.deleteAsset( from );
	}
}

module.exports = {
	...defaultConfig,
	entry: blockNames.reduce( ( entries, blockName ) => {
		entries[ `blocks/${ blockName }` ] = path.resolve(
			blocksDir,
			blockName,
			'index.js'
		);
		return entries;
	}, {} ),
	output: {
		...defaultConfig.output,
		filename: '[name]/index.js',
		path: path.resolve( __dirname, 'build' ),
	},
	plugins: [
		...defaultConfig.plugins,
		new BlockCssOutputPlugin(),
		new CopyPlugin( {
			patterns: blockNames.map( ( blockName ) => ( {
				from: path.resolve( blocksDir, blockName, 'block.json' ),
				to: path.resolve(
					__dirname,
					'build/blocks',
					blockName,
					'block.json'
				),
			} ) ),
		} ),
	],
};
