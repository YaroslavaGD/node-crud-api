import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers, getUserById } from '../controllers/userController';
import { CODES, MESSAGES, setHeader } from '../utils/helpers';

const END_POINTS = {
  USERS: '/api/users',
};

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export default async function handleRequest(req: IncomingMessage, res: ServerResponse) {
  const url = req.url || '';
  const method = req.method || '';
  const idMatch = url.match(/^\/api\/users\/([a-zA-Z0-9-]+)$/);

  if (url === END_POINTS.USERS && method === METHODS.GET) {
    await getAllUsers(req, res);
  } else if (idMatch && method === METHODS.GET) {
    await getUserById(req, res, idMatch[1]);
  } else {
    setHeader(res, CODES.NOT_FOUND);
    res.end(JSON.stringify({ message: MESSAGES.END_POINT_NOT_FOUND }));
  }
}
