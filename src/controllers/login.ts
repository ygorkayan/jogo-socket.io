import { clientsConnected, clientEvent } from '../servers/server-socket';

clientEvent.on('login', socket => {
  const player = {
    id: socket.id,
    color: colorRandom(),
    position: { x: '0px', y: '0px' },
  };

  socket.emit('login', {
    player,
    playersOnline: playersOnline(clientsConnected),
  });

  clientsConnected.set(player.id, { ...player, socket });
});

export const playersOnline = (clientsConnected: any) => {
  const clients = Array.from(clientsConnected.keys());

  return clients.map(idClient => {
    const { id, color, position } = clientsConnected.get(idClient);
    return { id, color, position };
  });
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