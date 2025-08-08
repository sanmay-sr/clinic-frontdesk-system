"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = exports.QueueStatus = void 0;
const typeorm_1 = require("typeorm");
var QueueStatus;
(function (QueueStatus) {
    QueueStatus["WAITING"] = "waiting";
    QueueStatus["WITH_DOCTOR"] = "with_doctor";
    QueueStatus["COMPLETED"] = "completed";
})(QueueStatus || (exports.QueueStatus = QueueStatus = {}));
let Queue = class Queue {
    id;
    patientName;
    patientPhone;
    queueNumber;
    status;
    isUrgent;
    notes;
    createdAt;
    updatedAt;
};
exports.Queue = Queue;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Queue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Queue.prototype, "patientName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Queue.prototype, "patientPhone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Queue.prototype, "queueNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: QueueStatus,
        default: QueueStatus.WAITING,
    }),
    __metadata("design:type", String)
], Queue.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Queue.prototype, "isUrgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Queue.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Queue.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Queue.prototype, "updatedAt", void 0);
exports.Queue = Queue = __decorate([
    (0, typeorm_1.Entity)('queue')
], Queue);
//# sourceMappingURL=queue.entity.js.map