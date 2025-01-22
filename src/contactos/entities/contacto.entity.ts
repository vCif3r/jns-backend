import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contactos')
export class Contacto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombreCompleto: string;
    @Column()
    email: string;
    @Column()
    tema: string;
    @Column()
    mensaje: string;
    @CreateDateColumn()
    createdAt: Date;
}
