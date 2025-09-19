import { UpdatePostDto } from './../posts/dto/update-post.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  // Busca por nombre de usuario y devuelve el usuario
  @Get('username/:username')
  buscarPorUsuario(@Param('username') username: string) {
    return this.service.findByUsername(username);
  }

  //Diferencia con el de arriba que devuelve true o false
  @Get('buscar/username/:username')
  buscarPorUsuarioBoolean(@Param('username') username: string) {
    return this.service.findByUsernameBoolean(username);
  }

  //Busca por email y devuelve true o false
  @Get('buscar/email/:email')
  buscarPorEmail(@Param('email') email: string) {
    return this.service.buscarEmail(email);
  }

  //Obtiene las publicaciones de un usuario
  @Get(':id/publications')
  yourPublications(@Param('id') id: string) {
    return this.service.yourPublications(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
