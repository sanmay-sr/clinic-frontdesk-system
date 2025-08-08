import { QueueService } from './queue.service';
import { Queue, QueueStatus } from '../entities/queue.entity';
export declare class QueueController {
    private readonly queueService;
    constructor(queueService: QueueService);
    findAll(): Promise<Queue[]>;
    findOne(id: string): Promise<Queue>;
    create(createQueueDto: Partial<Queue>): Promise<Queue>;
    update(id: string, updateQueueDto: Partial<Queue>): Promise<Queue>;
    updateStatus(id: string, status: QueueStatus): Promise<Queue>;
    remove(id: string): Promise<void>;
}
