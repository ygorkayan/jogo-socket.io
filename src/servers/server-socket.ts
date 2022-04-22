import config from '../config';
import { Server } from 'socket.io';
import { EventEmitter } from 'events';
import { httpServer } from './server-static';

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${config['port-server-static']}`,
  },
});

export const clientEvent = new EventEmitter();
export const clientsConnected = new Map();

io.on('connection', socket => {
  clientEvent.emit('login', socket);

  socket.on('movement', value => clientEvent.emit('movement', value, socket));
});

io.listen(config['port-server-socket']);
