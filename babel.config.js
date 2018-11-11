module.exports = {
    sourceMaps: true,
    presets: [
        [
            "@babel/preset-env"
        ]
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-object-rest-spread"
    ]
}
