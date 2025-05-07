import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

console.log('Hello world!');
console.log('UUID:', uuidv4());