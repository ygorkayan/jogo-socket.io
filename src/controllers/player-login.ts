import { clientsConnected, clientEvent } from '../servers/server-socket';

clientEvent.on('player-login', socket => {
  const player = {
    id: socket.id,
    color: colorRandom(),
    position: { x: 0, y: 0 },
  };

  socket.emit('player-login', {
    player,
    playersOnline: playersOnline(clientsConnected),
  });

  clientsConnected.set(player.id, { ...player, socket });
});

export const playersOnline = (clientsConnected: any) => {
  const players: Array<any> = [];

  clientsConnected.forEach((player: any) => {
    players.push({ id: player.id, color: player.color, position: player.position });
  });

  return players;
};

export const colorRandom = () => {
  const colors: Record<number, string> = {
    0: 'red',
    1: 'black',
    2: 'blue',
    3: 'yellow',
    4: 'green',
    5: 'brown',
    6: 'aqua',
    7: 'turquoise',
    8: 'coral',
    9: 'blueviolet',
    10: 'darkcyan',
  };

  return colors[Math.floor(Math.random() * 11)];
};
