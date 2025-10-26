import { IsString, MinLength, MaxLength } from 'class-validator';

export class RenamePetDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(20, { message: 'El nombre no puede tener más de 20 caracteres' })
  name: string;
}
