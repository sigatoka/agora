const net = require('net')
const childProcess = require('child_process')

const port = process.env.PORT ? process.env.PORT - 100 : 3000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let isRunning = false
const tryConnection = () => {
  client.connect( { port }, () => {
      client.end()
      if (!startedElectron) {
        console.log('Starting electron')
        isRunning = true
        const exec = childProcess.exec
        exec('node electron .')
      }
    }
  )
}

tryConnection()

client.on('error', () => {
  setTimeout(tryConnection, 1000)
});