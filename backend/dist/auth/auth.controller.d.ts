import { AuthService } from './auth.service';
export declare class LoginDto {
    username: string;
    password: string;
}
export declare class RegisterDto {
    username: string;
    password: string;
    role?: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            username: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<import("../entities/user.entity").User>;
}
