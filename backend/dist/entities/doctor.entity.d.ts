import { Appointment } from './appointment.entity';
export declare enum DoctorGender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
export declare class Doctor {
    id: number;
    name: string;
    specialization: string;
    gender: DoctorGender;
    location: string;
    availability: string;
    isActive: boolean;
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
