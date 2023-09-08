import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Pokemon } from './interfaces/pokemon.interfaces';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  private readonly pokeApiBaseUrl = process.env.POKE_API;
  private readonly pokemonCache: { [key: string]: Promise<any[]> } = {};

  async getAllPokemon(): Promise<Pokemon[]> {
    try {
      if (this.pokemonCache['allPokemon']) {
        return this.pokemonCache['allPokemon'];
      }

      const response: AxiosResponse<{ results: any[] }> = await this.httpService
        .get(`${this.pokeApiBaseUrl}?limit=151`)
        .toPromise();

      const results = response.data.results;

      const pokemonDetailsPromises = results.map((pokemon: any) =>
        this.getPokemonDetail(pokemon.url),
      );

      const allPokemon = await Promise.all(pokemonDetailsPromises);

      this.pokemonCache['allPokemon'] = Promise.resolve(allPokemon);

      return allPokemon;
    } catch (error) {
      console.error('error:', error);
      throw new Error('No se pudo obtener la lista de Pokémon.');
    }
  }

  async getPokemon(term: string): Promise<Pokemon | any[]> {
    if (this.pokemonCache[term]) {
      return this.pokemonCache[term];
    }

    const response: AxiosResponse = await this.httpService
      .get(`${this.pokeApiBaseUrl}/${term}`)
      .toPromise();

    const { id, name, sprites } = response.data;

    return {
      name,
      number: id,
      image: sprites.front_default,
    };
  }

  private async getPokemonDetail(url: string): Promise<Pokemon> {
    const response: AxiosResponse = await this.httpService.get(url).toPromise();
    const { id, name, sprites } = response.data;

    return {
      name,
      number: id,
      image: sprites.front_default,
    };
  }
}
