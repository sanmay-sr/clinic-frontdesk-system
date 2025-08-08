import { DoctorsService } from './doctors.service';
import { Doctor } from '../entities/doctor.entity';
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    findAll(): Promise<Doctor[]>;
    findActive(): Promise<Doctor[]>;
    findBySpecialization(specialization: string): Promise<Doctor[]>;
    findOne(id: string): Promise<Doctor>;
    create(createDoctorDto: Partial<Doctor>): Promise<Doctor>;
    update(id: string, updateDoctorDto: Partial<Doctor>): Promise<Doctor>;
    remove(id: string): Promise<void>;
}
