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
}

export default new UsersDb();
