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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../entities/doctor.entity");
let DoctorsService = class DoctorsService {
    doctorsRepository;
    constructor(doctorsRepository) {
        this.doctorsRepository = doctorsRepository;
    }
    async findAll() {
        return this.doctorsRepository.find({
            order: { name: 'ASC' },
        });
    }
    async findOne(id) {
        const doctor = await this.doctorsRepository.findOne({
            where: { id },
            relations: ['appointments'],
        });
        if (!doctor) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
        return doctor;
    }
    async create(doctorData) {
        const doctor = this.doctorsRepository.create(doctorData);
        return this.doctorsRepository.save(doctor);
    }
    async update(id, doctorData) {
        await this.doctorsRepository.update(id, doctorData);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.doctorsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
    }
    async findBySpecialization(specialization) {
        return this.doctorsRepository.find({
            where: { specialization },
            order: { name: 'ASC' },
        });
    }
    async findActive() {
        return this.doctorsRepository.find({
            where: { isActive: true },
            order: { name: 'ASC' },
        });
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map