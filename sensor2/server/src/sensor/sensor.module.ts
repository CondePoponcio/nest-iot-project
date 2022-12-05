import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { Sensor } from './entities/sensor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';
import { LocationsService } from 'src/locations/locations.service';
import { Locations } from 'src/locations/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sensor, Locations, Company])], 
  controllers: [SensorController],
  providers: [CompanyService, LocationsService, SensorService]
})
export class SensorModule {}
