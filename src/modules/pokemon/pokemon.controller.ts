import { Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Pokémon' })
  @ApiResponse({ status: 200, description: 'Lista de todos los Pokémon' })
  findAll() {
    return this.pokemonService.getAllPokemon();
  }

  @Get(':term')
  @ApiOperation({ summary: 'Obtener un Pokémon por término de búsqueda' })
  @ApiParam({
    name: 'term',
    description: 'Término de búsqueda para el Pokémon',
  })
  @ApiResponse({ status: 200, description: 'Pokémon encontrado con éxito' })
  @ApiResponse({ status: 404, description: 'Pokémon no encontrado' })
  findOne(@Param('term') term: string) {
    return this.pokemonService.getPokemon(term);
  }
}
