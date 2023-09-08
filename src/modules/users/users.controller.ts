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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/favorites')
  addFavorite(@Body(new ValidationPipe()) addFavoriteDto: AddFavoriteDto) {
    return this.usersService.addFavorite(addFavoriteDto);
  }

  @Get('/favorites')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getAllFavorites() {
    return this.usersService.getAllFavorites();
  }

  @Get('/favorites/login')
  @UseGuards(AuthGuard(), UserRoleGuard)
  async getFavoritesByLogin(@GetUser() user: User) {
    const userId = user._id.toString();
    return this.usersService.getFavoriteByUser(userId);
  }

  @Get('/favorites/:id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  getFavoriteByUserId(@Param('id') id: string) {
    return this.usersService.getFavoriteByUser(id);
  }

  @Patch('/favorites/:id/:number')
  RemoveFavorite(@Param('id') id: string, @Param('number') number: string) {
    return this.usersService.removeFavorite(id, number);
  }

  @Get()
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  removeUser(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.usersService.removeUser(id);
  }
}
