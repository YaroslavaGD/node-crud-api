import dotenv from 'dotenv';
import { createServer } from 'node:http';
import handleRequest from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  handleRequest(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
});
