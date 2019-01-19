# Agora
Simple File Conversion Application

> Built with Electron and React to interface with the bundled ffMpeg package.

## Build From Source
Simply execute the shell script `build.sh` to install dependencies, build source files and compile binaries. Alternatively, you can execute the entire process manually with the following steps;

> Make sure you have NodeJS and NPM installed then run the following commands in your command line.

#### Install
Install required dependencies via NPM
```
npm install
```

#### Build
Build the JavaScript source files with WebPack
```
npm run build
```

#### Compile
Compile the distribution binaries with Electron-Builder
```
npm run dist
```
