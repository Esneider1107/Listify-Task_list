// social/dto/share-task.dto.ts
import { IsString } from 'class-validator';

export class ShareTaskDto {
  @IsString()
  sharedWith: string; // correo, nombre o identificador del usuario
}
