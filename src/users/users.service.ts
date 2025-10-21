import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    await this.db.query('INSERT INTO users (name, email) VALUES (?, ?)', [
      createUserDto.name,
      createUserDto.email,
    ]);
    return { message: 'User created' };
  }

  async findAll() {
    return this.db.query('SELECT * FROM users');
  }

  async findOne(id: number) {
    const rows = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      updateUserDto.name,
      updateUserDto.email,
      id,
    ]);
    return { message: 'User updated' };
  }

  async remove(id: number) {
    await this.db.query('DELETE FROM users WHERE id = ?', [id]);
    return { message: 'User deleted' };
  }
}
