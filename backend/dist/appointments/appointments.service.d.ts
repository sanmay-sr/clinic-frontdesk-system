import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { Doctor } from '../entities/doctor.entity';
export declare class AppointmentsService {
    private appointmentsRepository;
    private doctorsRepository;
    constructor(appointmentsRepository: Repository<Appointment>, doctorsRepository: Repository<Doctor>);
    findAll(): Promise<Appointment[]>;
    findOne(id: number): Promise<Appointment>;
    create(appointmentData: Partial<Appointment>): Promise<Appointment>;
    update(id: number, appointmentData: Partial<Appointment>): Promise<Appointment>;
    remove(id: number): Promise<void>;
    updateStatus(id: number, status: AppointmentStatus): Promise<Appointment>;
    findByDoctor(doctorId: number): Promise<Appointment[]>;
    findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]>;
}
