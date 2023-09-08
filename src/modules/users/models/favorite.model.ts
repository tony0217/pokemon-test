import { Pokemon } from '@/modules/pokemon/interfaces/pokemon.interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Favorite extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({
    autoCreate: false,
    type: [{ _id: false, number: String, name: String, image: String }],
  })
  pokemon: Pokemon[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
