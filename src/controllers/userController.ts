import { IncomingMessage, ServerResponse } from 'node:http'; 
import UsersDb from '../db/usersDb';

export function getAllUsers(req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(UsersDb.getAll()));
}