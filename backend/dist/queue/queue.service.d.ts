import { Repository } from 'typeorm';
import { Queue, QueueStatus } from '../entities/queue.entity';
export declare class QueueService {
    private queueRepository;
    constructor(queueRepository: Repository<Queue>);
    findAll(): Promise<Queue[]>;
    findOne(id: number): Promise<Queue>;
    create(queueData: Partial<Queue>): Promise<Queue>;
    update(id: number, queueData: Partial<Queue>): Promise<Queue>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, status: QueueStatus): Promise<Queue>;
}
