import { clientsConnected, clientEvent } from '../servers/server-socket';
import { notifyAllClientOfMovement, playersOnline } from './helper';

clientEvent.on('movement', (value, socket) => {
  const client = clientsConnected.get(socket.id);
  clientsConnected.set(socket.id, { ...client, position: value });

  notifyAllClientOfMovement(clientsConnected, socket.id);
});

clientEvent.on('login', socket => {
  const data = {
    player: {
      id: socket.id,
      color: '#fff',
      position: { x: 0, y: 0 },
    },
    playersOnline: playersOnline(clientsConnected),
  };

  socket.emit('login', data);
  clientsConnected.set(socket.id, { ...data, socket });
});
