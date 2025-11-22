// src/history/dto/create-history.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateHistoryDto {
  @IsString({ message: 'El título debe ser un texto válido' })
  title: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'La categoría debe ser texto' })
  category?: string;

  @IsBoolean({ message: 'El campo done debe ser verdadero o falso' })
  done: boolean;
}
