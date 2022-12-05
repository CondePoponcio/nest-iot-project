import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('increment') id: number;
    @Column() username: string;
    @Column() password: string;
}
