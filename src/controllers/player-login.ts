import { clientEvent } from '../servers/server-socket';
import { IPlayersConnected } from '../helpers/interfaces';
import { colorRandom } from '../helpers/functions';

clientEvent.on('player-login', (socket: any, playersConected: IPlayersConnected) => {
  const player = {
    id: socket.id,
    color: colorRandom(),
    position: { x: 0, y: 0 },
  };

  const playersOnline = playersConected.map(({ id, color, position }) => ({ id, color, position }));

  socket.emit('player-login', {
    player,
    playersOnline,
  });

  playersConected.push({ ...player, socket });
});
