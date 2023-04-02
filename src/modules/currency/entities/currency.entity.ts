import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    title: string;

    @Column({type: "decimal", precision: 5, scale: 2, default: 0})
    buying_rate: number;

    @Column({type: "decimal", precision: 5, scale: 2, default: 0})
    selling_rate: number;
}