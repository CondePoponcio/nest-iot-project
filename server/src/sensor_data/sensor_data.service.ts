import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';
import { SensorDatum } from './entities/sensor_datum.entity';

@Injectable()
export class SensorDataService {
    constructor(
        @InjectRepository(SensorDatum)
        private sensorRepository: Repository<SensorDatum>,
    ) {}

    async create(createSensorDto: CreateSensorDatumDto) : Promise<void> {
        try{
            await this.sensorRepository.insert(createSensorDto);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    findAll() : Promise<SensorDatum[]> {
        try{
            return this.sensorRepository.find();
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    findOne(data: any) : Promise<SensorDatum> {
        try{
            return this.sensorRepository.findOneBy(data);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    async update(id: number, updateSensorDto: UpdateSensorDatumDto) : Promise<void> {
        try{ 
            await this.sensorRepository.save(updateSensorDto);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    async remove(id: number) : Promise<void> {
        try{
            await this.sensorRepository.delete(id);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
