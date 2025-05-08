import { ServerResponse } from 'node:http';

export const CODES = {
  OK: 200,
  NOT_FOUND: 404,
  INVALID: 400,
};

export const MESSAGES = {
  INVALID_UUID: 'Invalid UUID',
  USER_NOT_FOUND: 'User not found',
  END_POINT_NOT_FOUND: 'Endpoint not found',
};

export function setHeader(res: ServerResponse, statusCode: (typeof CODES)[keyof typeof CODES]) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
}
