import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.appointmentsService.findByDoctor(+doctorId);
  }

  @Post()
  create(@Body() createAppointmentDto: Partial<Appointment>) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: Partial<Appointment>) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: AppointmentStatus) {
    return this.appointmentsService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
