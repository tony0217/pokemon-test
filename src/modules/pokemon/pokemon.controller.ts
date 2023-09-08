import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll() {
    return this.pokemonService.getAllPokemon();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.getPokemon(term);
  }
}
