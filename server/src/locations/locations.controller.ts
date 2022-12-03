import { Controller, Get, Post, Body, Param, Delete, Put, Headers } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from 'src/company/company.service';

@Controller('locations')
export class LocationsController {
    constructor(
        private readonly locationsService: LocationsService,
        private readonly companyService: CompanyService,
        private jwtService: JwtService
        ) {}

    @Post()
    async create(@Headers() token, @Body() createLocationDto: CreateLocationDto) {
        try{
            console.log(token['token'].replace('"', ""))
            if(await this.jwtService.verifyAsync(token['token'].replace('"', "").replace('"', ""))){
                var key = await this.jwtService.decode(token['token'].replace('"', "").replace('"', ""));
                var result = await this.companyService.findOne({api_key:key['key']});
                if(result.id == createLocationDto.company_id){
                    return await this.locationsService.create(createLocationDto);
                }
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Get()
    async findAll(@Headers() token) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                return await this.locationsService.findAll();
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Get(':id')
    async findOne(@Headers() token, @Param('id') id: string) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = this.jwtService.decode(token['token']);
                var result = await this.companyService.findOne({api_key:key['key']})
                var result2 = await this.locationsService.findOne(+id)
                if(result.id == result2.company_id){
                    return result2;
                }                
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Put(':id')
    async update(@Headers() token, @Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = this.jwtService.decode(token['token']);
                var result = await this.companyService.findOne({api_key:key['key']})
                var result2 = await this.locationsService.findOne(+id)
                if(result.id == result2.company_id){
                    return await this.locationsService.update(+id, updateLocationDto);
                }
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Delete(':id')
    async remove(@Headers() token, @Param('id') id: string) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = this.jwtService.decode(token['token']);
                var result = await this.companyService.findOne({api_key:key['key']})
                var result2 = await this.locationsService.findOne(+id)
                if(result.id == result2.company_id){
                    return await this.locationsService.remove(+id);
                }
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
