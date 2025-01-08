import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import { connectDB, initializeDB } from './configs/db'
import { RaceHandler } from './sockets'
import app from './app'
import 'dotenv/config'
// Turn off listen, when you are testing
const port = process.env.NODE_PORT ?? 4000

export const server = createServer(app)
// + node server
// if not testing

server.listen(port, async () => {
  await initializeDB()
  connectDB()
  console.log(`running on http://localhost:${port}`)
})
// socket io
const io = new Server(server, { cors: { origin: '*' } })
const onConenction = (socket: Socket) => {
  RaceHandler(io, socket)
}
io.on('connection', onConenction)
