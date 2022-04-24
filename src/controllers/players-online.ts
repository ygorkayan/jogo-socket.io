import { clientsConnected, clientEvent } from '../servers/server-socket';
import { playersOnlineWithout } from './helpers';

clientEvent.on('players-online', socket => {
  setInterval(() => {
    const players = playersOnline(clientsConnected, socket.id);
    socket.emit('players-online', players);
  }, 1000);
});

export const playersOnline = (clientsConnected: any, playerCurrentId: any) => {
  const players: Array<any> = [];

  playersOnlineWithout(clientsConnected, playerCurrentId).forEach((player: any) => {
    players.push({
      id: player.id,
      color: player.color,
      position: player.position,
    });
  });

  return players;
};
