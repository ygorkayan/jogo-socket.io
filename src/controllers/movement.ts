import { clientsConnected, clientEvent } from '../servers/server-socket';
import { playersOnlineWithout } from './helpers';

clientEvent.on('movement', (value, socket) => {
  const client = clientsConnected.get(socket.id);
  clientsConnected.set(socket.id, { ...client, position: value });

  notifyAllClientOfMovement(clientsConnected, socket.id);
});

export const notifyAllClientOfMovement = (clientsConnected: Map<any, any>, whoSetMovement: string) => {
  const clientsWithoutWhoSetMovement = playersOnlineWithout(clientsConnected, whoSetMovement);

  clientsWithoutWhoSetMovement.forEach((client: any) => {
    const data = {
      who: whoSetMovement,
      newPosition: clientsConnected.get(whoSetMovement).position,
    };

    client.socket.emit('clientMovement', data);
  });
};
