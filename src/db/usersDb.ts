import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';

class UsersDb {
  private users: User[] = [
    {
      id: uuidv4(),
      username: 'John',
      age: 30,
      hobbies: ['playing computer games', 'doing nothing'],
    },
  ];

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = { ...user, id: uuidv4() };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updatedUser: Omit<User, 'id'>): User | null {
    const index = this.users.findIndex((user: User) => user.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updatedUser };
    return this.users[index];
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user: User) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

export default new UsersDb();
