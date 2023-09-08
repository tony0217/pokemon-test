import { IsString } from 'class-validator';

export class PokemonDto {
  @IsString()
  number: string;

  @IsString()
  name: string;

  @IsString()
  image: string;
}
