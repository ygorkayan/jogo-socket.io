import { clientEvent } from '../servers/server-socket';
import { IPlayersConnected, TMovement } from '../helpers/interfaces';

clientEvent.on('player-movement', (value: TMovement, socket: any, playersConected: IPlayersConnected) => {
  playersConected.forEach(player => {
    player.socket.emit('player-movement', {
      who: socket.id,
      newPosition: value,
    });
  });
});
