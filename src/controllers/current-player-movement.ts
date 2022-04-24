import { clientEvent } from '../servers/server-socket';
import { IPlayersConnected, IPlayers } from '../helpers/interfaces';

clientEvent.on('current-player-movement', (value: TMovement, socket, playersConected: IPlayersConnected) => {
  let moviment;

  playersConected.forEach(player => {
    if (player.id === socket.id) {
      moviment = movement(value, player, 20);
      player.position = moviment;
    }
  });

  clientEvent.emit('player-movement', moviment, socket, playersConected);
});

const movement = (typeMovement: TMovement, player: IPlayers, speed: number) => {
  let { x, y } = player.position;

  if (typeMovement === 'ArrowLeft') {
    y -= speed;
  }

  if (typeMovement === 'ArrowUp') {
    x -= speed;
  }

  if (typeMovement === 'ArrowRight') {
    y += speed;
  }

  if (typeMovement === 'ArrowDown') {
    x += speed;
  }

  return { x, y };
};

type TMovement = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown';
