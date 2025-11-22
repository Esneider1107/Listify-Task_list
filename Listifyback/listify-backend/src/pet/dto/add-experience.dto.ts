// pet/dto/add-experience.dto.ts
import { IsInt, Min } from 'class-validator';

export class AddExperienceDto {
  @IsInt({ message: 'El valor de puntos debe ser un número entero' })
  @Min(1, { message: 'Debes añadir al menos 1 punto de experiencia' })
  points: number;
}
