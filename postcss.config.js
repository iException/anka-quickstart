module.exports = {
	plugins: [
		require('postcss-import')(),
		require('postcss-nested'),
		require('postcss-for'),
		require('postcss-preset-env')({
			browsers: ['ie 8'],
			features: {
				autoprefixer: false
			}
		}),
		require('postcss-reporter')({ clearReportedMessages: true })
	]
}
