# <img src="/assets/icons/32x32.png" alt="Logo" height="28px"> Agora
Simple File Conversion Application

> Built with Electron and React to interface with the bundled ffMpeg package.

## Usage
### Build From Source
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

### Run From Source (Development)
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

## Tech Stack
**FFMpeg**
The backbone of our file conversion, FFMpeg which normally install in the command line, instead comes bundles with the application and interfaced behind the scenes with our NodeJS Service.

**Electron**
Thanks to GitHub for this little open source gem. Electron makes JavaScript web interfaces run within desktop applications and across all platforms.

**eletron-builder**
It may be just a plugin, but electron-builder carries most of the weight when it comes to compiling, code signing and publishing our binaries, everything distribution is here!

**React**
No need to introduce this one... React helps easily create component based applications and is extremely powerful when combined with Electron.

**Lottie**
Lottie is an open source project by AirBnb and is resonsible for the fancy SVG progress and logo animations within the application. 

**WebPack**

- webpack-dev-server: Hosts live builds from source with hot swap loading to make sure we're always viewing the latest verison when developing.

**Foreman**
Starting a development environment is made simple thanks to Foreman. This module helps us configure a startup command queue, waiting for our webpack-dev-server to begin serving before starting our electron application, and all in one command.

**Mocha**
Last but not least is our testing framework, Mocha. Possibly the most important thing in a test-driven development environment, and ironing out bugs for production, Mocha makes sure our code does what it says it does!