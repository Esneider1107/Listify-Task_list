import { Controller, Get, Post, Body } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  getAll() {
    return this.historyService.getAll();
  }

  @Get('completed')
  getCompleted() {
    return this.historyService.getCompleted();
  }

  @Get('pending')
  getPending() {
    return this.historyService.getPending();
  }

  @Post()
  addToHistory(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historyService.addToHistory(createHistoryDto);
  }
}
