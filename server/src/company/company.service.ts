import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {}
    
    async create(createCompanyDto: CreateCompanyDto) : Promise<{}> {
        return await this.companyRepository.insert(createCompanyDto);
    }

    async findAll() : Promise<Company[]> {
        return await this.companyRepository.find();
    }

    async findOne(data: any) : Promise<Company> {
        return await this.companyRepository.findOneBy(data);
    }

    async update(id: number, updateCompanyDto: UpdateCompanyDto) : Promise<void> {
        await this.companyRepository.update(id,updateCompanyDto);
    }

    async remove(id: number) : Promise<void> {
        await this.companyRepository.delete(id);
    }
}
