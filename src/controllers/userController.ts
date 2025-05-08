import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as validateUUID } from 'uuid';
import UsersDb from '../db/usersDb';
import { CODES, MESSAGES, setHeader } from '../utils/helpers';

export async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  setHeader(res, CODES.OK);
  res.end(JSON.stringify(UsersDb.getAll()));
}

export async function getUserById(req: IncomingMessage, res: ServerResponse, id: string) {
  if (!validateUUID(id)) {
    setHeader(res, CODES.INVALID);
    res.end(JSON.stringify({ message: MESSAGES.INVALID_UUID }));
    return;
  }

  const user = UsersDb.getById(id);
  if (!user) {
    setHeader(res, CODES.NOT_FOUND);
    res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND }));
    return;
  }

  setHeader(res, CODES.OK);
  res.end(JSON.stringify(user));
}
