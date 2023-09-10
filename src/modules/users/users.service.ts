import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './models/user.model';
import { Favorite } from './models/favorite.model';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { validate } from 'class-validator';

const USER_NOT_FOUND = 'Usuario no encontrado';

@Injectable()
export class UsersService {
  private userCache: Map<string, Favorite> = new Map();
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>,
  ) {}

  async addFavorite(addFavoriteDto: AddFavoriteDto): Promise<Favorite> {
    const { userId, pokemon } = addFavoriteDto;

    // Buscar un favorito existente por userId
    const existingFavorite = await this.favoriteModel
      .findOne({ userId })
      .exec();

    if (existingFavorite) {
      // Verificar si hay Pokémon duplicados
      const duplicatePokemon = pokemon.find((newPokemon) =>
        existingFavorite.pokemon.some((p) => p.number === newPokemon.number),
      );

      if (duplicatePokemon) {
        throw new BadRequestException(
          'Uno o más Pokémon ya están en la lista de favoritos',
        );
      }

      // Agregar los nuevos Pokémon al favorito existente
      existingFavorite.pokemon.push(...pokemon);
      await existingFavorite.save();
      return existingFavorite;
    }

    // Si no existe un favorito para el usuario, crear uno nuevo
    const newFavorite = new this.favoriteModel({
      userId,
      pokemon,
    });

    // Utilizar class-validator para validar el DTO
    const errors = await validate(newFavorite);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return newFavorite.save();
  }

  async getAllFavorites(): Promise<Favorite[]> {
    return this.favoriteModel.find().exec();
  }

  async getFavoriteByUser(userId: string): Promise<Favorite> {
    const favorite = await this.favoriteModel.findOne({ userId }).exec();

    if (!favorite) {
      throw new NotFoundException(`Favorite with userId ${userId} not found`);
    }
    return favorite;
  }

  async removeFavorite(userId: string, number: string): Promise<Favorite> {
    // Buscar al usuario por su ID
    const user = await this.favoriteModel.findOne({ userId }).exec();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si existe un Pokémon con el número proporcionado
    const pokemonIndex = user.pokemon.findIndex(
      (pokemon: any) => pokemon.number === number,
    );

    if (pokemonIndex === -1) {
      throw new NotFoundException(
        'El Pokémon no existe en la lista de favoritos',
      );
    }

    // Eliminar el Pokémon del array de favoritos
    user.pokemon.splice(pokemonIndex, 1);

    // Actualizar el usuario en la base de datos con la lista de Pokémon actualizada
    await this.favoriteModel
      .updateOne({ userId }, { $set: { pokemon: user.pokemon } })
      .exec();

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(id: Types.ObjectId): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();

      if (!user) {
        throw new NotFoundException(USER_NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new BadRequestException('ID no válido');
    }
  }

  async removeUser(id: Types.ObjectId): Promise<string> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const { fullName } = user;

    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return `Se ha eliminado con éxito al usuario: ${fullName}`;
  }
}
