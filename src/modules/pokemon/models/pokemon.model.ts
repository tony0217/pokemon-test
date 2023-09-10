import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  @Prop()
  number: string;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop({ type: [String] })
  types: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
