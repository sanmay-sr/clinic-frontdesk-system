import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from '../entities/doctor.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('doctors')
@UseGuards(JwtAuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.doctorsService.findActive();
  }

  @Get('specialization/:specialization')
  findBySpecialization(@Param('specialization') specialization: string) {
    return this.doctorsService.findBySpecialization(specialization);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Post()
  create(@Body() createDoctorDto: Partial<Doctor>) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: Partial<Doctor>) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
