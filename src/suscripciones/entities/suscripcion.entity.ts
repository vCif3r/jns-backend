import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('suscripcion')
export class Suscripcion {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @CreateDateColumn()
    createdAt: Date;
}
