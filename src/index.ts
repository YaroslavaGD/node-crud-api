import dotenv from 'dotenv';
import { createServer } from 'node:http';
import handleRequest from './routes/userRoutes';
import { MESSAGES } from './utils/helpers';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(MESSAGES.SERVER_RUNNING, PORT);
});
