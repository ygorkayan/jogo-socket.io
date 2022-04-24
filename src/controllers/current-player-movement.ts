import config from '../config';
import { clientEvent } from '../servers/server-socket';
import { movement } from '../helpers/functions';
import { IPlayersConnected, TMovement } from '../helpers/interfaces';

clientEvent.on('current-player-movement', (value: TMovement, socket, playersConected: IPlayersConnected) => {
  let moviment;

  playersConected.forEach(player => {
    if (player.id === socket.id) {
      moviment = movement(value, player, config['movement-speed']);
      player.position = moviment;
    }
  });

  clientEvent.emit('player-movement', moviment, socket, playersConected);
});
