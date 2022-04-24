import { clientEvent } from '../servers/server-socket';
import config from '../config';
import { IPlayersConnected, IPlayers } from '../helpers/interfaces';
import { colorRandom } from '../helpers/functions';

clientEvent.on('player-login', (socket: any, playersConected: IPlayersConnected) => {
  const player: IPlayers = {
    id: socket.id,
    color: colorRandom(),
    position: { x: config['position-start-x'], y: config['position-start-y'] },
  };

  const playersOnline = playersConected.map(({ id, color, position }) => ({ id, color, position }));

  socket.emit('player-login', {
    player,
    playersOnline,
  });

  playersConected.push({ ...player, socket });
});
