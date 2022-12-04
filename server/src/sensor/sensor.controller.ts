import { Controller, Get, Post, Body, Param, Delete, Put, Headers } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { LocationsService } from 'src/locations/locations.service';
import { CompanyService } from 'src/company/company.service';

@Controller('sensor')
export class SensorController {
    constructor(
        private readonly sensorService: SensorService,
        private readonly locationService: LocationsService,
        private readonly companyService: CompanyService
    ) {}

    @Post()
    async create(@Headers() token, @Body() createSensorDto: CreateSensorDto) {
        try{
            var result = await this.companyService.findOne({"api_key":token["token"].replace('"',"").replace('"',"")})
            var result2 = await this.locationService.findOne({id: createSensorDto.location_id})
            if(result.id == result2.company_id){
                var data = await this.sensorService.create(createSensorDto);
                return data['generatedMaps'][0].api_key;
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
    
    @Get('token')
    async getToken(@Body() id: string) {
        var result = await this.sensorService.findOne(+id)
        return result.api_key;
    } 

    @Get()
    async findAll() {
        try{
            return await this.sensorService.findAll();
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Get(':id')
    async findOne(@Headers() token, @Param('id') id: string) {
        try{
            var result = await this.companyService.findOne({"api_key":token["token"].replace('"',"").replace('"',"")})
            var result2 = await this.sensorService.findOne({"id":id});
            var result3 = await this.locationService.findOne({id: result2.location_id})
            if(result.id == result3.company_id && result2.location_id == result3.id){
                return result2;     
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Put(':id')
    async update(@Headers() token, @Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
        try{
            var result = await this.companyService.findOne({"api_key":token["token"].replace('"',"").replace('"',"")})
            var result2 = await this.sensorService.findOne({"id":id});
            var result3 = await this.locationService.findOne({id: result2.location_id})
            if(result.id == result3.company_id && result2.location_id == result3.id){
                return await this.sensorService.update(+id, updateSensorDto);      
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Delete(':id')
    async remove(@Headers() token, @Param('id') id: string) {
        try{
            var result = await this.companyService.findOne({"api_key":token["token"].replace('"',"").replace('"',"")})
            var result2 = await this.sensorService.findOne({"id":id});
            var result3 = await this.locationService.findOne({id: result2.location_id})
            if(result.id == result3.company_id && result2.location_id == result3.id){
                return await this.sensorService.remove(+id);     
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
