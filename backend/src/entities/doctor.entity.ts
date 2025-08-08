import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

export enum DoctorGender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column({
    type: 'enum',
    enum: DoctorGender,
  })
  gender: DoctorGender;

  @Column()
  location: string;

  @Column('text')
  availability: string; // JSON string of availability schedule

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
