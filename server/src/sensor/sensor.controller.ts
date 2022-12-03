import { Controller, Get, Post, Body, Param, Delete, Put, Headers } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { JwtService } from '@nestjs/jwt';
import { LocationsService } from 'src/locations/locations.service';
import { CompanyService } from 'src/company/company.service';

@Controller('sensor')
export class SensorController {
    constructor(
        private readonly sensorService: SensorService,
        private readonly locationService: LocationsService,
        private readonly companyService: CompanyService,
        private jwtService: JwtService
    ) {}

    @Post()
    async create(@Headers() token, @Body() createSensorDto: CreateSensorDto) {
        try{
            if(await this.jwtService.verifyAsync(token['token'].replace('"', "").replace('"', ""))){
                var key = await this.jwtService.decode(token['token'].replace('"', "").replace('"', ""));
                var result = await this.companyService.findOne({api_key:key['key']});
                var result2 = await this.locationService.findOne({id: createSensorDto.location_id})
                if(result.id == result2.company_id){
                    var data = await this.sensorService.create(createSensorDto);
                    const payload = { key: data['generatedMaps'][0].api_key };
                    var sensor_api_key = this.jwtService.sign(payload);
                    return sensor_api_key;
                }
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
    
    @Get('token')
    async getToken(@Body() key: string) {
        const payload = { key: key };
        return {company_api_key: this.jwtService.sign(payload)};
    } 

    @Get()
    async findAll(@Headers() token) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                return await this.sensorService.findAll();
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
                var result2 = await this.sensorService.findOne(+id)
                var result3 = await this.locationService.findOne({id: result2.location_id})
                if(result.id == result3.company_id && result2.location_id == result3.id){
                    return result2;
                }       
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Put(':id')
    async update(@Headers() token, @Param('id') id: string, @Body() updateSensorDto: UpdateSensorDto) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = this.jwtService.decode(token['token']);
                var result = await this.companyService.findOne({api_key:key['key']})
                var result2 = await this.sensorService.findOne(+id)
                var result3 = await this.locationService.findOne({id: result2.location_id})
                if(result.id == result3.company_id && result2.location_id == result3.id){
                    return await this.sensorService.update(+id, updateSensorDto);
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
                var result2 = await this.sensorService.findOne(+id)
                var result3 = await this.locationService.findOne({id: result2.location_id})
                if(result.id == result3.company_id && result2.location_id == result3.id){
                    return await this.sensorService.remove(+id);
                }       
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
