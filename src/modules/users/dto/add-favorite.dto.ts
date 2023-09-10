import { IsMongoId, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { PokemonDto } from '@/modules/pokemon/dto/pokemon.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AddFavoriteDto {
  @IsMongoId()
  @ApiProperty({
    example: '60d0fe4b692f1d001c89a5b1',
    description: 'ID del usuario',
  })
  userId: Types.ObjectId;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PokemonDto)
  @ApiProperty({
    type: [
      {
        _id: false,
        number: String,
        name: String,
        image: String,
        types: [String],
      },
    ],
    example: [
      {
        number: '1',
        name: 'Bulbasaur',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        types: ['Grass', 'Poison'],
      },
    ],
    description: 'Lista de objetos PokemonDto que se agregarán como favoritos',
    isArray: true,
  })
  pokemon: PokemonDto[];
}
