import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private jwtService: JwtService
    ) {}

    @Post()
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        var result = await this.companyService.create(createCompanyDto);
        const payload = { key: result['generatedMaps'][0].api_key };
        var company_api_key = this.jwtService.sign(payload);
        return [result['generatedMaps'][0].id, company_api_key];
    }

    @Get('token')
    async getToken(@Body() key: string) {
        const payload = { key: key };
        return {company_api_key: this.jwtService.sign(payload)};
    } 

    @Get()
    async findAll() {
        return await this.companyService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.companyService.findOne(+id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return await this.companyService.update(+id, updateCompanyDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.companyService.remove(+id);
    }
}
