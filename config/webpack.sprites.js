const SpritesmithPlugin = require('webpack-spritesmith');
const path = require('path');
const paths = require('./paths');

module.exports = {
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, paths.prod.spritesLocation),
                glob: paths.prod.spritesSrcGlob, // Adjust this pattern based on your sprite images
            },
            target: {
                image: path.resolve(__dirname, paths.prod.spritesImgOutput), // Adjust output path
                css: path.resolve(__dirname, paths.prod.spritesStylesOutput), // Adjust output path
            },
            apiOptions: {
                cssImageRef: paths.prod.spriteCssImgRef, // Adjust image reference in CSS
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            esModule: false,
                            preprocessor: (content) => {
                                content = content.replace(
                                    /<img([^>]*)src=["']\.\/images\/sprites\/([^"']+)["']([^>]*)>/g,
                                    (match, __beforeSrc, filenameWithExtension, afterAttributes) => {
                                    // Extract the filename from the path and remove the extension
                                        const filenameWithoutExtension = filenameWithExtension.replace(/\.[^.]+$/, '');

                                        // Extract existing classes from the attributes
                                        const existingClassesMatch = match.match(/class=["'](.*?)["']/);
                                        const existingClasses = existingClassesMatch ? existingClassesMatch[1] : '';

                                        // Create a div with the extracted classes and the original attributes
                                        const newClassName = `icon-${filenameWithoutExtension}`;
                                        let updatedClasses;
                                        if (existingClasses) {
                                            updatedClasses = `${existingClasses} ${newClassName}`;
                                        } else {
                                            updatedClasses = newClassName;
                                        }

                                        const className = `class="${updatedClasses}"`;

                                        return `<div ${className}${afterAttributes}></div>`;
                                    });

                                return content;
                            },


                        },
                    },

                ],
            },
        ],
    },

};
