import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue, QueueStatus } from '../entities/queue.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private queueRepository: Repository<Queue>,
  ) {}

  async findAll(): Promise<Queue[]> {
    return this.queueRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Queue> {
    const queue = await this.queueRepository.findOne({ where: { id } });
    if (!queue) {
      throw new NotFoundException(`Queue item with ID ${id} not found`);
    }
    return queue;
  }

  async create(queueData: Partial<Queue>): Promise<Queue> {
    const lastQueue = await this.queueRepository.findOne({
      order: { queueNumber: 'DESC' },
    });
    const nextQueueNumber = lastQueue ? lastQueue.queueNumber + 1 : 1;
    
    const queue = this.queueRepository.create({
      ...queueData,
      queueNumber: nextQueueNumber,
    });
    return this.queueRepository.save(queue);
  }

  async update(id: number, queueData: Partial<Queue>): Promise<Queue> {
    await this.queueRepository.update(id, queueData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.queueRepository.delete(id);
  }

  async updateStatus(id: number, status: QueueStatus): Promise<Queue> {
    return this.update(id, { status });
  }
}
