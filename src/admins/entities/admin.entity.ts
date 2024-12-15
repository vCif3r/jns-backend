import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    cedula: string;

    @Column()
    telefono: string;

    @Column({unique: true})
    email: string;
    
    @Exclude() 
    @Column({})
    password: string;

    @Column({nullable: true})
    foto: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    pais: string
}
