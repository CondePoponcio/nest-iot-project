import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Put, Inject, Injectable } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';
import { CompanyService } from 'src/company/company.service';
const mqtt = require('mqtt');

@Controller('api/v1/sensor_data')
export class SensorDataController {
    constructor(
        private readonly sensorDataService: SensorDataService,
        private readonly companyService: CompanyService
    ) {}

    @Get('sensorData')
    async getDataSensor() {
        console.log("Ques cosas", process.env.MQTT_HOST)
        
        const client = mqtt.connect(process.env.MQTT_HOST, {
            clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        })
        await client.on('connect', () => {
            console.log('Connected')
            client.subscribe(['sensorData'], () => {
              console.log(`Subscribe to topic sensorData`)
            })
        })
        await client.on('message', (topic, payload) => {
            console.log('Received Message:', topic, payload.toString())
            let date = new Date();
            let numDate: number = Date.parse(date.toString());
            this.sensorDataService.create({data: JSON.parse(payload).data, api_key:JSON.parse(payload).api_key, time:numDate});
          })
    }


    @Post()
    async create(@Headers() token, @Body() createSensorDto: CreateSensorDatumDto) {
        try{
            if(token['token'] == createSensorDto.api_key){
                return await this.sensorDataService.create(createSensorDto);
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
    
    @Get()
    async findDataSensor(@Headers() token, @Body() data) {
        try{
            var result = await this.companyService.findOne({"api_key":token["token"]})
            if(result){
                return await this.sensorDataService.findAll(data);
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Get(':id')
    async findOne(@Headers() token, @Param('id') id: string) {
        try{
            var result2 = await this.sensorDataService.findOne({id:+id})
            if(token['token'] == result2.data['api_key']){
                return result2;
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Put(':id')
    async update(@Headers() token, @Param('id') id: string, @Body() updateSensorDto: UpdateSensorDatumDto) {
        try{
            var result2 = await this.sensorDataService.findOne({"id":id});
            if(token['token'] == result2.data['api_key']){
                return await this.sensorDataService.update(+id, updateSensorDto);
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Delete(':id')
    async remove(@Headers() token, @Param('id') id: string) {
        try{
            var result2 = await this.sensorDataService.findOne({"id":id});
            if(token['token'] == result2.data['api_key']){
                return await this.sensorDataService.remove(+id);
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
