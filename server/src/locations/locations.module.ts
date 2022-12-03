import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Locations } from './entities/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/company/company.module';
import { CompanyController } from 'src/company/company.controller';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';

@Module({
    imports: [TypeOrmModule.forFeature([Locations, Company]), JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '7d' },
      })],
    controllers: [LocationsController],
    providers: [CompanyService, LocationsService]
})
export class LocationsModule {}
