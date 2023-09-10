import { IsString, IsArray } from 'class-validator';

export class PokemonDto {
  @IsString()
  number: string;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsArray()
  types: string[];
}
