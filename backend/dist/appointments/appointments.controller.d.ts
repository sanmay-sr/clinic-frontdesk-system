import { AppointmentsService } from './appointments.service';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    findByDoctor(doctorId: string): Promise<Appointment[]>;
    create(createAppointmentDto: Partial<Appointment>): Promise<Appointment>;
    update(id: string, updateAppointmentDto: Partial<Appointment>): Promise<Appointment>;
    updateStatus(id: string, status: AppointmentStatus): Promise<Appointment>;
    remove(id: string): Promise<void>;
}
