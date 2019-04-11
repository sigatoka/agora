const { Socket } = require('net');
const { exec } = require('child_process');
const port = 'number' === typeof process.env.PORT ? process.env.PORT : 9000;

process.env.MODE = 'development';

const client = new Socket()

let isRunning = false
const tryConnection = () => {
  client.connect( { port }, () => {
      client.end()
      if (!isRunning) {
        isRunning = true
        console.log('Starting electron');
        exec('npm run start:electron');
      }
    }
  )
}

client.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    console.log("Connection failed, retrying in 3 seconds");
    setTimeout(tryConnection, 3000);
  } else {
    console.log(err.code);
  }
});

tryConnection()