# Webpack-boilerplate

## 1: 
In terminal, make sure you're in project's driectory

## 2: 
If you're using nvm, in terminal, run command "nvm use" to switch to required version of node. Alternativley you can download a version of node specyfied in .nvmrc file manualy.

## 3: 
In terminal, run "npm install" to download all packages required for the repository.

## 4: 
To start live server in development mode, in terminal, run "npm run start". This will automaticaly compile all files necessary for project. This command watches and updates project live.

## 5: 
To build production version of the project, in terminal, run "npm run build". Project will be compiled into folder "dist".

## In build process:
This webpack configuration is using a webpack-spritesmith plugin. It is set up to turn images located in "/src/images/sprites/" into a sprite file. It will then place that file in "dist" folder(path can be adjusted in "config/paths.js" file) together with referencing css file. Css file is automatically injected into final html file. All files in "/src/images/sprites/" folder need to have the same extension. You can set up wchich extension you want to use in file: "config/paths.js". By default it is set up to ".png" files. It is important to note that this is only for raster type images and vector type image extensions like ".svg" are not compatibile.

## Attention: because in build process files located in "src/images/sprites" folder are turned into sprites, html file is automatically modified to turn selected img tags into div tags with class referencing sprite css file with bacground img set to original img file. This means that those images will now be considered as block elements(nature of div tags), so additionall style attribute of: "display:inline-block" may be required to keep same visual output as development process. It may be useful to pre-program it in development mode to avoid any issues.

## All paths and folder names can be adjusted in "config/paths.js" file
