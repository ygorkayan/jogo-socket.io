export const playersOnline = (clientsConnected: any) => {
  const clients = Array.from(clientsConnected.keys());

  const temp: Array<any> = [];

  clients.forEach(idClient => {
    const { id, color, position } = clientsConnected.get(idClient);
    temp.push({ id, color, position });
  });

  return temp;
};

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
