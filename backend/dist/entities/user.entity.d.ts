export declare enum UserRole {
    ADMIN = "admin",
    STAFF = "staff"
}
export declare class User {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
