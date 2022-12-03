import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column() name: string;
    @Column() @Generated('uuid') api_key: string;
}
