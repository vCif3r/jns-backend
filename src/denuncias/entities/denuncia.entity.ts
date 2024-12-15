import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('denuncias')
export class Denuncia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @Column({ type: 'time' })
    hora: string;
    
    @Column({type: 'enum', enum: ['Civil','Laboral','Comercial','Familiar','Otro']})
    tipo: string;

    @Column()
    detalles: string;
    
    @Column()
    correo: string;

    @Column()
    demandante: string;

    @Column({ unique: true }) // Código único
    codigo: string;

    @Column()
    lugar: string;

    @Column()
    hechos: string;

    @CreateDateColumn()
    createdAt: Date;
}
