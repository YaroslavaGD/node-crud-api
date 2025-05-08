import dotenv from 'dotenv';
import { createServer } from 'node:http';
import { router } from './routes/user.routes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on  ${PORT}`);
});