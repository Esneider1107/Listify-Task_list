// user-progress/user-progress.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { AddExperienceDto } from './dto/add-experience.dto';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Get()
  getProgress() {
    return this.userProgressService.getProgress();
  }

  @Post('experience')
  addExperience(@Body() addExperienceDto: AddExperienceDto) {
    return this.userProgressService.addExperience(addExperienceDto.points);
  }
}
