import dotenv from 'dotenv';
import { createServer } from 'node:http';
import handleRequest from './routes/user.router';
import { MESSAGES } from './utils/constants';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const server = createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING, PORT);
});
