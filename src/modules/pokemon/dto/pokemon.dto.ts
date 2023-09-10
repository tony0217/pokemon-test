import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @IsString()
  @ApiProperty({ example: '001', description: 'Número del Pokémon' })
  number: string;

  @IsString()
  @ApiProperty({ example: 'Bulbasaur', description: 'Nombre del Pokémon' })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'https://example.com/pokemon.png',
    description: 'URL de la imagen del Pokémon',
  })
  image: string;

  @IsArray()
  @ApiProperty({
    example: ['Grass', 'Poison'],
    description: 'Tipos del Pokémon',
    isArray: true,
  })
  types: string[];
}
