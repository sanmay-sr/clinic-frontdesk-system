"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const queue_entity_1 = require("../entities/queue.entity");
const common_2 = require("@nestjs/common");
let QueueService = class QueueService {
    queueRepository;
    constructor(queueRepository) {
        this.queueRepository = queueRepository;
    }
    async findAll() {
        return this.queueRepository.find({
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(id) {
        const queue = await this.queueRepository.findOne({ where: { id } });
        if (!queue) {
            throw new common_2.NotFoundException(`Queue item with ID ${id} not found`);
        }
        return queue;
    }
    async create(queueData) {
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
    async update(id, queueData) {
        await this.queueRepository.update(id, queueData);
        return this.findOne(id);
    }
    async remove(id) {
        await this.queueRepository.delete(id);
    }
    async updateStatus(id, status) {
        return this.update(id, { status });
    }
};
exports.QueueService = QueueService;
exports.QueueService = QueueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(queue_entity_1.Queue)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], QueueService);
//# sourceMappingURL=queue.service.js.map