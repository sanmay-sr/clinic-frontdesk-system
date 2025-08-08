import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async create(doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(doctorData);
    return this.doctorsRepository.save(doctor);
  }

  async update(id: number, doctorData: Partial<Doctor>): Promise<Doctor> {
    await this.doctorsRepository.update(id, doctorData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.doctorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
  }

  async findBySpecialization(specialization: string): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      where: { specialization },
      order: { name: 'ASC' },
    });
  }

  async findActive(): Promise<Doctor[]> {
    return this.doctorsRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }
}
