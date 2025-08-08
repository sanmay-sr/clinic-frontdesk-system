"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_service_1 = require("./auth/auth.service");
const user_entity_1 = require("./entities/user.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    try {
        await authService.register('admin', 'admin123', user_entity_1.UserRole.ADMIN);
        console.log('✅ Default admin user created successfully!');
        console.log('Username: admin');
        console.log('Password: admin123');
    }
    catch (error) {
        if (error.message.includes('duplicate')) {
            console.log('ℹ️  Admin user already exists');
        }
        else {
            console.error('❌ Error creating admin user:', error.message);
        }
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map