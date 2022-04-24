import config from '../config';
import { clientEvent } from '../servers/server-socket';
import { IPlayers, IPlayersConnected } from '../helpers/interfaces';
import { playersOnlineWithout } from '../helpers/functions';

clientEvent.on('players-online', (socket, playersConected) =>
  setInterval(
    () => socket.emit('players-online', playersOnline(playersConected, socket.id)),
    config['players-online-reload']
  )
);

export const playersOnline = (playersConected: IPlayersConnected, playerCurrentId: string) =>
  playersOnlineWithout(playersConected, playerCurrentId).map((player: IPlayers) => ({
    id: player.id,
    color: player.color,
    position: player.position,
  }));
