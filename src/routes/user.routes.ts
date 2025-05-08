import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers } from '../controllers/userController';

export const router = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || '';
    const method = req.method || '';

    if (url === '/api/users' && method === 'GET' ) {
        return getAllUsers(req, res);
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message: 'Endpoint not found'}));
}