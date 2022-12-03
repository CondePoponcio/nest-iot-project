import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { Sensor } from './entities/sensor.entity';

@Injectable()
export class SensorService {
    constructor(
        @InjectRepository(Sensor)
        private sensorRepository: Repository<Sensor>,
    ) {}
    
    async create(createSensorDto: CreateSensorDto) : Promise<{}> {
        try{
            return await this.sensorRepository.insert(createSensorDto);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    findAll() : Promise<Sensor[]> {
        try{
            return this.sensorRepository.find();
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    findOne(data: any) : Promise<Sensor> {
        try{
            return this.sensorRepository.findOneBy(data);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    async update(id: number, updateSensorDto: UpdateSensorDto) : Promise<void> {
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
