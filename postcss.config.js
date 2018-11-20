module.exports = {
	plugins: [
		require('postcss-import')(),
		require('postcss-nested'),
		require('postcss-for'),
		require('postcss-preset-env')({
            preserve: false, // Do not delete !
			browsers: ['ie 8'],
            autoprefixer: false
		}),
		require('postcss-reporter')({ clearReportedMessages: true })
	]
}
