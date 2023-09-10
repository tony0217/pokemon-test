import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, RoleProtected } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';
import { UserRoleGuard } from '../auth/guards/user-role.guard';
import { User } from './models/user.model';
import { ParseMongoIdPipe } from '@/core/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/favorites')
  @ApiOperation({ summary: 'Añadir pokemon favorito a un usuario' })
  @ApiResponse({ status: 201, description: 'Favorito añadido con éxito' })
  @UseGuards(AuthGuard(), UserRoleGuard)
  addFavorite(@Body(new ValidationPipe()) addFavoriteDto: AddFavoriteDto) {
    return this.usersService.addFavorite(addFavoriteDto);
  }

  @Get('/favorites')
  @ApiOperation({
    summary: 'Obtener todos los favoritos (solo para administradores)',
  })
  @ApiBearerAuth()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getAllFavorites() {
    return this.usersService.getAllFavorites();
  }

  @Get('/favorites/login')
  @ApiOperation({
    summary: 'Obtener los pokemon favoritos de un usuario autenticado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), UserRoleGuard)
  async getFavoritesByLogin(@GetUser() user: User) {
    const userId = user._id.toString();
    return this.usersService.getFavoriteByUser(userId);
  }

  @Get('/favorites/:id')
  @ApiOperation({
    summary:
      'Obtener los pokemon favoritos de un usuario por ID (solo para administradores)',
  })
  @ApiBearerAuth()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getFavoriteByUserId(@Param('id') id: string) {
    return this.usersService.getFavoriteByUser(id);
  }

  @Patch('/favorites/:id/:number')
  @ApiOperation({
    summary: 'Eliminar un pokemon favorito de un usuario por ID y número',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), UserRoleGuard)
  RemoveFavorite(@Param('id') id: string, @Param('number') number: string) {
    return this.usersService.removeFavorite(id, number);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  getUserById(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  @ApiOperation({
    summary: 'Eliminar un usuario por ID (solo para administradores)',
  })
  removeUser(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.removeUser(id);
  }
}
