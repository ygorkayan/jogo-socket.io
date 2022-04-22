import { clientsConnected, clientEvent } from '../servers/server-socket';

clientEvent.on('movement', (value, socket) => {
  const client = clientsConnected.get(socket.id);
  clientsConnected.set(socket.id, { ...client, position: value });

  notifyAllClientOfMovement(clientsConnected, socket.id);
});

export const notifyAllClientOfMovement = (clientsConnected: Map<any, any>, whoSetMovement: string) => {
  const clients = Array.from(clientsConnected.keys());
  const clientsWithoutWhoSetMovement = clients.filter(id => id !== whoSetMovement);

  const newPosition = clientsConnected.get(whoSetMovement).position;

  clientsWithoutWhoSetMovement.forEach(id => {
    const client = clientsConnected.get(id);

    const data = {
      who: whoSetMovement,
      newPosition,
    };

    client.socket.emit('clientMovement', data);
  });
};
