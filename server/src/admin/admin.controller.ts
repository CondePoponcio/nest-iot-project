import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private jwtService: JwtService
    ) {}

    @Post('register')
    async register(@Body() createAdminDto: CreateAdminDto) {
        try{
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(createAdminDto.password, saltOrRounds);
            createAdminDto.password = hashedPassword;
            return await this.adminService.create(createAdminDto);
        } catch (err) {
            console.log(err);
        }
    }

    @Post('login')
    async login(@Body() createAdminDto: CreateAdminDto) {
        try{
            var username = createAdminDto.username;
            var user = await this.adminService.findOne(username);
            if(await bcrypt.compare(createAdminDto.password, user.password)){
                return this.jwtService.sign({ username: username })
            }
        } catch (err) {
            console.log(err);
        }
    }

    @Get()
    async findAll() {
        return await this.adminService.findAll();
    }

    @Get(':username')
    async findOne(@Param('username') username: string) {
        return await this.adminService.findOne(username);
    }

    @Put(':username')
    async update(@Param('username') username: string, @Body() updateAdminDto: UpdateAdminDto) {
        return await this.adminService.update(username, updateAdminDto);
    }

    @Delete(':username')
    async remove(@Param('username') username: string) {
        return await this.adminService.remove(username);
    }
}
