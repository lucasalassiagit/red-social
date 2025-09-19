import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll() {
    return this.repo.find({
      where: { isActive: true },
      //relations: ['posts'],  Incluye posts del user
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['posts'],
    });
  }

  //Creado para buscar por nombre de usuario
  async findByUsername(username: string) {
    const user = await this.repo.findOne({
      where: { username },
    });
    if (!user) {
      throw new Error('No se pudo encontrar el usuario');
    }
    return user;
  }

  //Igual al de arriba pero devuelve booleano
  async findByUsernameBoolean(username: string) {
    const user = await this.repo.findOne({
      where: { username },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  //busca por email y devuelve true o false
  async buscarEmail(email: string) {
    const user = await this.repo.findOne({
      where: { email },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  //Obtiene las publicaciones de un usuario
  async yourPublications(id: number) {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user.posts;
  }

  async create(data: CreateUserDto) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: number, data: UpdateUserDto) {
    // Si se está actualizando la contraseña, hashearla antes de guardarla
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }

    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.repo.update(id, { isActive: false });
  }
}
