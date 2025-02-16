import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    category: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    quantity: number;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    imageurl: string;
}