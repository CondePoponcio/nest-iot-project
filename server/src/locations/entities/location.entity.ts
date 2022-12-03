import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Locations {
    @Column() company_id: number;
    @PrimaryGeneratedColumn('increment') id: number;
    @Column() name: string;
    @Column() country: string;
    @Column() city: string;
    @Column() meta: string;
}
