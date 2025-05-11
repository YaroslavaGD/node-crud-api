import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { User } from '../models/user.model';

const users: User[] = [];

const userService = {
  getAll: (): User[] => users,

  getById: (id: string): User | null => {
    if (!validateUUID(id)) return null;
    return users.find((user) => user.id === id) || null;
  },

  create: ({ username, age, hobbies }: Omit<User, 'id'>): User => {
    const newUser: User = {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };
    users.push(newUser);
    return newUser;
  },

  update: (id: string, data: Omit<User, 'id'>): User | null => {
    const index = users.findIndex((user: User) => user.id === id);
    if (index === -1) return null;
    const updatedUser: User = { ...users[index], ...data };
    users[index] = updatedUser;
    return updatedUser;
  },

  delete: (id: string): boolean => {
    const index = users.findIndex((user: User) => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};

export default userService;
