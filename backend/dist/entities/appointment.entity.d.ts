import { Doctor } from './doctor.entity';
export declare enum AppointmentStatus {
    SCHEDULED = "scheduled",
    CONFIRMED = "confirmed",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class Appointment {
    id: number;
    patientName: string;
    patientPhone: string;
    notes: string;
    doctor: Doctor;
    doctorId: number;
    dateTime: Date;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
}
