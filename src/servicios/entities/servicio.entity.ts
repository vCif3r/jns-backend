import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('servicios')
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nombre: string;

    @Column({type: 'text', nullable: false})
    descripcion: string;

    @Column({ type: 'enum', enum: ['proceso_legal','consultoria']})
    categoria: string;

    @Column({default: true})
    disponible: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // automatically generated
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // automatically generated
}
