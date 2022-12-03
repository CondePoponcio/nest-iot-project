
import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Locations } from './entities/location.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Locations)
        private locationRepository: Repository<Locations>,
    ) {}

    async create(createLocationDto: CreateLocationDto) : Promise<void> {
        try {
            await this.locationRepository.insert(createLocationDto)
        } catch (err){
            console.log(err);
            return err.name;
        }
    }

    findAll(): Promise<Locations[]> {
        try {
            return this.locationRepository.find();
        } catch (err){
            console.log(err);
            return err.name;
        }
    }

    findOne(data: any) : Promise<Locations> {
        try {
            return this.locationRepository.findOneBy(data);
        } catch (err){
            console.log(err);
            return err.name;
        }
    }

    async update(id: number, updateLocationDto: UpdateLocationDto) : Promise<void> {
        try {
            await this.locationRepository.update(id, updateLocationDto);
        } catch (err){
            console.log(err);
            return err.name;
        }
    }
    
    async remove(id: number) : Promise<void> {
        try {
            await this.locationRepository.delete(id);
        } catch (err){
            console.log(err);
            return err.name;
        }
    }
}