import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QueueService } from './queue.service';
import { Queue, QueueStatus } from '../entities/queue.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('queue')
@UseGuards(JwtAuthGuard)
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queueService.findOne(+id);
  }

  @Post()
  create(@Body() createQueueDto: Partial<Queue>) {
    return this.queueService.create(createQueueDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: Partial<Queue>) {
    return this.queueService.update(+id, updateQueueDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: QueueStatus) {
    return this.queueService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueService.remove(+id);
  }
}
