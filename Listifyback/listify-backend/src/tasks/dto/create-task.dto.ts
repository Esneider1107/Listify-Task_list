//tasks/dto/create-task.dto.ts
import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string; 


  @IsBoolean()
  @IsOptional()
  done?: boolean;  

  @IsBoolean()
  @IsOptional()
  shared?: boolean;

  @IsString()
  @IsOptional()
  sharedWith?: string;
  
}
