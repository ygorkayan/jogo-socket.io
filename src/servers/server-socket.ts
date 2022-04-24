import config from '../config';
import { Server } from 'socket.io';
import { EventEmitter } from 'events';
import { httpServer } from './server-static';
import { IPlayersConnected } from '../helpers/interfaces';

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:${config['port-server-static']}`,
  },
});

export const clientEvent = new EventEmitter();
const playersConected: IPlayersConnected = [];

io.on('connection', socket => {
  clientEvent.emit('player-login', socket, playersConected);
  clientEvent.emit('players-online', socket, playersConected);

  socket.on('disconnect', () => clientEvent.emit('disconnect', socket, playersConected));
  socket.on('current-player-movement', value =>
    clientEvent.emit('current-player-movement', value, socket, playersConected)
  );
});

io.listen(config['port-server-socket']);
