import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as validateUUID } from 'uuid';
import userService from '../services/user.service';
import { CODES, MESSAGES, parseBody, setHeader } from '../utils/helpers';
import { User } from '../models/user.model';

export async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    setHeader(res, CODES.OK);
    res.end(JSON.stringify(userService.getAll()));
  } catch {
    setHeader(res, CODES.SERVER_ERROR);
    res.end(JSON.stringify({ message: MESSAGES.SERVER_ERROR }));
  }
}

export async function getUserById(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!validateUUID(id)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_UUID }));
      return;
    }

    const user = userService.getById(id);
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

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { username, age, hobbies } = await parseBody<Omit<User, 'id'>>(req);

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_FIELDS }));
      return;
    }

    const newUser = userService.create({ username, age, hobbies });
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

    const user = userService.update(id, { username, age, hobbies });
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
export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!validateUUID(id)) {
      setHeader(res, CODES.INVALID);
      res.end(JSON.stringify({ message: MESSAGES.INVALID_UUID }));
      return;
    }

    const deleteRes = userService.delete(id);
    if (!deleteRes) {
      setHeader(res, CODES.NOT_FOUND);
      res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND }));
      return;
    }

    setHeader(res, CODES.DELETE);
    res.end(JSON.stringify({ message: MESSAGES.USER_DELETED }));
  } catch {
    setHeader(res, CODES.SERVER_ERROR);
    res.end(JSON.stringify({ message: MESSAGES.SERVER_ERROR }));
  }
}
