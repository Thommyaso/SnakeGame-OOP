/* eslint-disable max-len */
const common = {
    spritesStylesheetPath: 'images/sprites/', // Output path for sprite files
    spritesFileName: 'sprite', // Set name for output css and img sprite file name
    spritesType: '.png', // This sets what extention will be used for sprites in the whole project
    devFolder: 'dev',
    buildFolder: 'dist', // Name of the final build folder (if name gets changed .gitignore will require updating)
};

module.exports = {
    main: {
        mainEntry: './src/index.js',
        htmlTemplate: './src/index.html',
        watchHtml: 'src/**/*.html',
        styleFile: '../src',
    },
    dev: {
        outputFolder: `./${common.devFolder}`,
        serverFolder: `${common.devFolder}`,
    },
    prod: {
        spritesSrcGlob: `*${common.spritesType}`,
        spritesStylesheet: `./${common.spritesStylesheetPath}${common.spritesFileName}.css`,
        spritesStylesOutput: `../${common.buildFolder}/${common.spritesStylesheetPath}${common.spritesFileName}.css`,
        spritesImgOutput: `../${common.buildFolder}/${common.spritesStylesheetPath}${common.spritesFileName}${common.spritesType}`,
        spritesLocation: '../src/images/sprites', // Path to images that require converting to sprites
        spriteCssImgRef: `./${common.spritesFileName}${common.spritesType}`,
        outputFolder: `../${common.buildFolder}`,
    },
};
