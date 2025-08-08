export declare enum QueueStatus {
    WAITING = "waiting",
    WITH_DOCTOR = "with_doctor",
    COMPLETED = "completed"
}
export declare class Queue {
    id: number;
    patientName: string;
    patientPhone: string;
    queueNumber: number;
    status: QueueStatus;
    isUrgent: boolean;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
