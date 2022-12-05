import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) {}

    @Post()
    async create(@Body() createCompanyDto: CreateCompanyDto) {
        var result = await this.companyService.create(createCompanyDto);
        return [result['generatedMaps'][0].id, result['generatedMaps'][0].api_key];
    }

    @Get('token')
    async getToken(@Body() id: string) {
        var result = await this.companyService.findOne(+id)
        return result.api_key;
    } 

    @Get()
    async findAll() {
        return await this.companyService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.companyService.findOne({"id":id});
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
