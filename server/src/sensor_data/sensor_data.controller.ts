import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, Put, Inject, Injectable } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';
import { JwtService } from '@nestjs/jwt';
const mqtt = require('mqtt');

@Controller('api/v1/sensor_data')
export class SensorDataController {
    constructor(
        private readonly sensorDataService: SensorDataService,
        private jwtService: JwtService
    ) {}

    @Get('sensorData')
    async getDataSensor() {
        const client = mqtt.connect(`mqtt://mosquitto:1883`, {
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
            this.sensorDataService.create({data: payload.toString()});
          })
    }


    @Post()
    async create(@Headers() token, @Body() createSensorDto: CreateSensorDatumDto) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = await this.jwtService.decode(token['token']);
                console.log(key['key'], createSensorDto.data['api_key'])
                if(key['key'] == createSensorDto.data['api_key']){
                  console.log("J")
                    return await this.sensorDataService.create(createSensorDto);
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
                return await this.sensorDataService.findAll();
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
                var key = await this.jwtService.decode(token['token']);
                var result2 = await this.sensorDataService.findOne({id:+id})
                var parse = JSON.stringify(result2.data);
                
                console.log(key, parse)
                if(key['key'] == result2.data['api_key']){
                    return result2;
                }
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }

    @Put(':id')
    async update(@Headers() token, @Param('id') id: string, @Body() updateSensorDto: UpdateSensorDatumDto) {
        try{
            if(await this.jwtService.verifyAsync(token['token'])){
                var key = await this.jwtService.decode(token['token']);
                var result2 = await this.sensorDataService.findOne(+id)
                if(key['key'] == result2.data['api_key']){
                    return await this.sensorDataService.update(+id, updateSensorDto);
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
                var key = await this.jwtService.decode(token['token']);
                var result2 = await this.sensorDataService.findOne(+id)
                if(key['key'] == result2.data['api_key']){
                    return await this.sensorDataService.remove(+id);
                }     
            }
        } catch (err) {
            console.log(err);
            return err.name;
        }
    }
}
