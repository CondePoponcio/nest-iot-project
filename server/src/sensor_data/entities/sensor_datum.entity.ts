import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SensorDatum {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column('simple-json') data: {};
}
