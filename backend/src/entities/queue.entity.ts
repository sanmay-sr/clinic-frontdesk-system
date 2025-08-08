import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum QueueStatus {
  WAITING = 'waiting',
  WITH_DOCTOR = 'with_doctor',
  COMPLETED = 'completed',
}

@Entity('queue')
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  patientPhone: string;

  @Column()
  queueNumber: number;

  @Column({
    type: 'enum',
    enum: QueueStatus,
    default: QueueStatus.WAITING,
  })
  status: QueueStatus;

  @Column({ default: false })
  isUrgent: boolean;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
