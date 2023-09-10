import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa el decorador de Swagger

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Dirección de correo electrónico del usuario',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
  })
  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre completo del usuario',
  })
  fullName: string;
}
