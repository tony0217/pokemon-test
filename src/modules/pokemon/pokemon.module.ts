import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  imports: [HttpModule.register({})],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
