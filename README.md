# Agora
Simple File Conversion Application

> Built with Electron and React to interface with the bundled ffMpeg package.

## Build From Source
Simply execute the shell script `./build.sh` in your terminal to install dependencies, build source files and compile binaries. Alternatively, you can execute the entire process manually with the following steps;

> Make sure you have Node.js with NPM installed, then run the following commands in your terminal.

Install required dependencies via NPM
```
npm install
```

Build the JavaScript source files with WebPack
```
npm run build
```

Compile the distribution binaries with Electron-Builder
```
npm run dist
```

## Run From Source (Development)
Alternatively, if you'd like to contribute to the project and require a local development application, simply execute `./run.sh` in yout terminal or start a new development environemnt manually like so;

> Make sure you have Node.js with NPM installed, then run the following commands in your terminal.

Install required dependencies via NPM
```
npm install
```

Start Foreman to manage WebPack-Dev-Server and Electron
```
npm start
```