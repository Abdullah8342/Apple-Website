// webpack.config.js
export const module = {
    rules: [
        {
            test: /\\\\.css$/,
            use: [
                'style-loader', // Or MiniCssExtractPlugin.loader
                'css-loader',
                'postcss-loader', // Add this loader
            ],
        },
        // Other rules...
    ],
};