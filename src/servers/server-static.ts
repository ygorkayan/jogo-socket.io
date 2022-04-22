import config from '../config';
import express from 'express';
import { createServer } from 'http';
import path from 'path';

const app = express();
export const httpServer = createServer(app);

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.listen(config['port-server-static'], () => console.log(config['msg-server-static-online']));
