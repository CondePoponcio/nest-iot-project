import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class SensorDatum {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column('simple-json') data: {};
    @Column() api_key: string;
    @Column() time: number; 
}
