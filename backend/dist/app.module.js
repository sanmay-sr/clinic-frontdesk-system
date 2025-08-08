"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const queue_module_1 = require("./queue/queue.module");
const appointments_module_1 = require("./appointments/appointments.module");
const doctors_module_1 = require("./doctors/doctors.module");
const user_entity_1 = require("./entities/user.entity");
const doctor_entity_1 = require("./entities/doctor.entity");
const appointment_entity_1 = require("./entities/appointment.entity");
const queue_entity_1 = require("./entities/queue.entity");
const configuration_1 = __importDefault(require("./config/configuration"));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    url: configService.get('database.url'),
                    entities: [user_entity_1.User, doctor_entity_1.Doctor, appointment_entity_1.Appointment, queue_entity_1.Queue],
                    synchronize: configService.get('NODE_ENV') === 'development',
                    logging: configService.get('NODE_ENV') === 'development',
                    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            queue_module_1.QueueModule,
            appointments_module_1.AppointmentsModule,
            doctors_module_1.DoctorsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map