import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Processlog {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    process: string;

    @Index()
    @Column()
    user_id: number;

    @Index()
    @Column()
    currency_id: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    amount: number;

    @CreateDateColumn()
    created_at: Date;
}
