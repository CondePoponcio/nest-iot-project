import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sensor {
    @Column() location_id: number;
    @PrimaryGeneratedColumn('increment') id: number;
    @Column() name: string;
    @Column() category: string;
    @Column() meta: string;
    @Column() @Generated('uuid') api_key: string;
}
