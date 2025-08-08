import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { UserRole } from './entities/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authService = app.get(AuthService);

  try {
    // Create default admin user
    await authService.register('admin', 'admin123', UserRole.ADMIN);
    console.log('✅ Default admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    if (error.message.includes('duplicate')) {
      console.log('ℹ️  Admin user already exists');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
  }

  await app.close();
}

bootstrap();
