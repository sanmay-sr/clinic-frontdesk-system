"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3001', 10),
    database: {
        url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/clinic_frontdesk',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    },
});
//# sourceMappingURL=configuration.js.map