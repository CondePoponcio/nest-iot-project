import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) {}

    async create(createAdminDto: CreateAdminDto) : Promise<void> {
        await this.adminRepository.insert(createAdminDto);
    }

    findAll() : Promise<Admin[]> {
        return this.adminRepository.find();
    }

    findOne(data : any) : Promise<Admin> {
        return this.adminRepository.findOneBy(data);
    }

    async update(username: string, updateAdminDto: UpdateAdminDto) : Promise<void> {
        await this.adminRepository.update(username,updateAdminDto);
    }

    async remove(username: string) : Promise<void> {
        await this.adminRepository.delete(username);
    }
}
