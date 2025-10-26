import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { SocialService } from './social.service';
import { ShareTaskDto } from './dto/share-task.dto';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get()
  getSharedTasks() {
    return this.socialService.getSharedTasks();
  }

  @Get(':id/shared-with')
  getSharedWith(@Param('id') id: number) {
    return this.socialService.getSharedWith(id);
  }

  @Patch(':id/share')
    shareTask(@Param('id') id: number, @Body() dto: ShareTaskDto) {
  return this.socialService.shareTask(id, dto.sharedWith);
}

}
