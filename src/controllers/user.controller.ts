import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as validateUUID } from 'uuid';
import userService from '../services/user.service';
import { MESSAGES } from '../utils/constants';
import { parseBody, respond } from '../utils/helpers';
import { User } from '../models/user.model';

export async function getAllUsers(req: IncomingMessage, res: ServerResponse) {
  try {
    const users = userService.getAll();
    respond.ok(res, users);
  } catch {
    respond.serverError(res);
  }
}

export async function getUserById(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!validateUUID(id)) {
      respond.badRequest(res, MESSAGES.INVALID_UUID);
      return;
    }

    const user = userService.getById(id);
    if (!user) {
      respond.notFound(res, MESSAGES.USER_NOT_FOUND);
      return;
    }

    respond.ok(res, user);
  } catch {
    respond.serverError(res);
  }
}

export async function createUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const { username, age, hobbies } = await parseBody<Omit<User, 'id'>>(req);

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      respond.badRequest(res);
      return;
    }

    const newUser = userService.create({ username, age, hobbies });
    respond.created(res, newUser);
  } catch {
    respond.serverError(res);
  }
}

export async function updateUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const { username, age, hobbies } = await parseBody<Omit<User, 'id'>>(req);

    if (!validateUUID(id)) {
      respond.badRequest(res, MESSAGES.INVALID_UUID);
      return;
    }

    if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
      respond.badRequest(res);
      return;
    }

    const updated = userService.update(id, { username, age, hobbies });
    if (!updated) {
      respond.notFound(res, MESSAGES.USER_NOT_FOUND);
      return;
    }

    respond.ok(res, updated);
  } catch {
    respond.serverError(res);
  }
}

export async function deleteUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    if (!validateUUID(id)) {
      respond.badRequest(res, MESSAGES.INVALID_UUID);
      return;
    }

    const deleted = userService.delete(id);
    if (!deleted) {
      respond.notFound(res, MESSAGES.USER_NOT_FOUND);
      return;
    }

    respond.noContent(res);
  } catch {
    respond.serverError(res);
  }
}
