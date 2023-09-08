import { IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { PokemonDto } from '@/modules/pokemon/dto/pokemon.dto';

export class AddFavoriteDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PokemonDto)
  pokemon: PokemonDto[];
}
