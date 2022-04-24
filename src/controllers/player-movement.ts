import { clientEvent } from '../servers/server-socket';
import { IPlayersConnected, IMovement } from '../helpers/interfaces';
import { playersOnlineWithout } from '../helpers/functions';

clientEvent.on('player-movement', (value: IMovement, socket: any, playersConected: IPlayersConnected) => {
  playersConected.forEach((player) => {
    player.socket.emit('player-movement', {
      who: socket.id,
      newPosition: value,
    });
  });
});
