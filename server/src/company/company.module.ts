import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Company]), JwtModule.register({
        secret: 'secretKey',
        signOptions: { expiresIn: '7d' },
      })],
    controllers: [CompanyController],
    providers: [CompanyService]
})
export class CompanyModule {}
