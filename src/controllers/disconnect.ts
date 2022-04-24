import { clientsConnected, clientEvent } from '../servers/server-socket';

clientEvent.on('disconnect', socket => clientsConnected.delete(socket.id));
