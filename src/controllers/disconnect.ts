import { clientEvent } from '../servers/server-socket';
import { IPlayersConnected } from '../helpers/interfaces';

clientEvent.on('disconnect', (socket, playersConected: IPlayersConnected) =>
  playersConected.forEach((player, index) => (player.id === socket.id ? playersConected.splice(index, 1) : false))
);
