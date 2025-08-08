import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ['doctor'],
      order: { dateTime: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async create(appointmentData: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentsRepository.create(appointmentData);
    return this.appointmentsRepository.save(appointment);
  }

  async update(id: number, appointmentData: Partial<Appointment>): Promise<Appointment> {
    await this.appointmentsRepository.update(id, appointmentData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appointmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async updateStatus(id: number, status: AppointmentStatus): Promise<Appointment> {
    return this.update(id, { status });
  }

  async findByDoctor(doctorId: number): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { doctorId },
      relations: ['doctor'],
      order: { dateTime: 'ASC' },
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    return this.appointmentsRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .where('appointment.dateTime >= :startDate', { startDate })
      .andWhere('appointment.dateTime <= :endDate', { endDate })
      .orderBy('appointment.dateTime', 'ASC')
      .getMany();
  }
}
