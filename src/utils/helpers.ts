import { IncomingMessage, ServerResponse } from 'node:http';
import { CODES, MESSAGES } from './constants';

export function setHeader(res: ServerResponse, statusCode: (typeof CODES)[keyof typeof CODES]) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
}

export function parseBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

export const respond = {
  ok: (res: ServerResponse, data: unknown) => {
    res.writeHead(CODES.OK, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },

  created: (res: ServerResponse, data: unknown) => {
    res.writeHead(CODES.CREATE, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  },

  noContent: (res: ServerResponse) => {
    res.writeHead(CODES.DELETE);
    res.end();
  },

  badRequest: (res: ServerResponse, message = MESSAGES.INVALID_FIELDS) => {
    res.writeHead(CODES.INVALID, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
  },

  notFound: (res: ServerResponse, message = MESSAGES.USER_NOT_FOUND) => {
    res.writeHead(CODES.NOT_FOUND, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
  },

  serverError: (res: ServerResponse, message = MESSAGES.SERVER_ERROR) => {
    res.writeHead(CODES.SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message }));
  },
};
