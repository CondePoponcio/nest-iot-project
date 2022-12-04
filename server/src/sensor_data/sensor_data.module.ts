import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { SensorDataController } from './sensor_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorDatum } from './entities/sensor_datum.entity';
import { JwtModule } from '@nestjs/jwt';
import { SensorService } from 'src/sensor/sensor.service';
import { Sensor } from 'src/sensor/entities/sensor.entity';
import { CompanyController } from 'src/company/company.controller';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sensor, SensorDatum, Company]), JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '7d' },
    })],
    controllers: [SensorDataController],
    providers: [CompanyService, SensorService, SensorDataService]
})
export class SensorDataModule {}
