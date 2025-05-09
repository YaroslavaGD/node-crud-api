import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as validateUUID } from 'uuid';
import UsersDb from '../db/usersDb';
import { CODES, MESSAGES, parseBody, setHeader } from '../utils/helpers';
import { User } from '../models/user.model';

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

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { username, age, hobbies } = await parseBody<Omit<User, 'id'>>(req);

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_FIELDS }));
      return;
    }

    const newUser = UsersDb.create({ username, age, hobbies });
    setHeader(res, CODES.CREATE);
    res.end(JSON.stringify(newUser));
  } catch {
    setHeader(res, CODES.SERVER_ERROR);
    res.end(JSON.stringify({ message: MESSAGES.SERVER_ERROR }));
  }
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const { username, age, hobbies } = await parseBody<Omit<User, 'id'>>(req);
    if (!validateUUID(id)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_UUID }));
      return;
    }

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_FIELDS }));
      return;
    }

    const user = UsersDb.update(id, { username, age, hobbies });
    if (!user) {
      setHeader(res, CODES.NOT_FOUND);
      res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND }));
      return;
    }

    setHeader(res, CODES.OK);
    res.end(JSON.stringify(user));
  } catch {
    setHeader(res, CODES.SERVER_ERROR);
    res.end(JSON.stringify({ message: MESSAGES.SERVER_ERROR }));
  }
}
