import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorModule } from './sensor/sensor.module';
import { CompanyModule } from './company/company.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from './locations/locations.module';
import { Admin } from './admin/entities/admin.entity';
import { Company } from './company/entities/company.entity';
import { Locations } from './locations/entities/location.entity';
import { Sensor } from './sensor/entities/sensor.entity';
import { SensorDataModule } from './sensor_data/sensor_data.module';
import { SensorDatum } from './sensor_data/entities/sensor_datum.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [Admin, Company, Locations, Sensor, SensorDatum],
            synchronize: true,
        }),
        SensorModule, CompanyModule, AdminModule, LocationsModule, SensorDataModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

/*@Module({
    imports: [
        ClientsModule.register([
            {
            name: 'SENSOR_SERVER',
            transport: Transport.MQTT,
            options: {
                url: 'mqtt://mosquitto:1883',
            }
            },
            SensorModule, CompanyModule, AdminModule, LocationsModule, SensorDataModule]),]
})
export class AppModule2 {}*/
