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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("../entities/appointment.entity");
const doctor_entity_1 = require("../entities/doctor.entity");
let AppointmentsService = class AppointmentsService {
    appointmentsRepository;
    doctorsRepository;
    constructor(appointmentsRepository, doctorsRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.doctorsRepository = doctorsRepository;
    }
    async findAll() {
        return this.appointmentsRepository.find({
            relations: ['doctor'],
            order: { dateTime: 'ASC' },
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ['doctor'],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async create(appointmentData) {
        const appointment = this.appointmentsRepository.create(appointmentData);
        return this.appointmentsRepository.save(appointment);
    }
    async update(id, appointmentData) {
        await this.appointmentsRepository.update(id, appointmentData);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.appointmentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
    }
    async updateStatus(id, status) {
        return this.update(id, { status });
    }
    async findByDoctor(doctorId) {
        return this.appointmentsRepository.find({
            where: { doctorId },
            relations: ['doctor'],
            order: { dateTime: 'ASC' },
        });
    }
    async findByDateRange(startDate, endDate) {
        return this.appointmentsRepository
            .createQueryBuilder('appointment')
            .leftJoinAndSelect('appointment.doctor', 'doctor')
            .where('appointment.dateTime >= :startDate', { startDate })
            .andWhere('appointment.dateTime <= :endDate', { endDate })
            .orderBy('appointment.dateTime', 'ASC')
            .getMany();
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map