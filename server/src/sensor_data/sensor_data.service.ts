import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sensor } from 'src/sensor/entities/sensor.entity';
import { Repository } from 'typeorm';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';
import { SensorDatum } from './entities/sensor_datum.entity';

@Injectable()
export class SensorDataService {
    constructor(
        @InjectRepository(SensorDatum)
        private sensorRepository: Repository<SensorDatum>,
        @InjectRepository(Sensor)
        private sensor2Repository: Repository<Sensor>,
    ) {}

    async create(createSensorDto: CreateSensorDatumDto) : Promise<void> {
        try{
            await this.sensorRepository.insert(createSensorDto);
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    async findAll(data: any){
        try{
            var result = await this.sensor2Repository.createQueryBuilder("sensor").where("sensor.id IN (:...ids)", { ids: data.sensor_id }).getMany();
            var keys = []
            for(var i=0;i<result.length;i++){
                keys.push(result[i].api_key)
            }
            return await this.sensorRepository.createQueryBuilder("SensorDatum").where('SensorDatum.api_key IN (:...api_keys) and SensorDatum.time >= :from and SensorDatum.time <= :to', { api_keys:keys, from: data.from, to: data.to }).getMany();
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
            await this.sensorRepository.update(id,updateSensorDto);
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
