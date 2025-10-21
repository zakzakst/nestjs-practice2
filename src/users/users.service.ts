import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    await this.db.query('INSERT INTO users (name, email) VALUES (?, ?)', [
      createUserDto.name,
      createUserDto.email,
    ]);
    return { message: 'User created' };
  }

  async findAll() {
    // return `This action returns all users`;
    return this.db.query('SELECT * FROM users');
  }

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    const rows = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    await this.db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      updateUserDto.name,
      updateUserDto.email,
      id,
    ]);
    return { message: 'User updated' };
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    await this.db.query('DELETE FROM users WHERE id = ?', [id]);
    return { message: 'User deleted' };
  }
}
