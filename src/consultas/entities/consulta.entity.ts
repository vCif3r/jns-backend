import { Caso } from "src/casos/entities/caso.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('consultas')
export class Consulta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreCompleto: string;

    @Column()
    cedula: string;

    @Column()
    email: string;

    @Column({type: 'text'})
    detalles: string;

    @ManyToOne(() => Servicio, servicio => servicio.consultas)
    servicio: Servicio;

    @ManyToOne(() => User, abogado => abogado.consultasAbogado, {nullable: true, cascade: false})
    abogado: User | null;

    @Column({type: 'datetime'})
    fechaHora: Date;

    @Column({type: 'text'})
    hechos: string;

    @Column({type: 'enum', enum: ['pendiente','revision','cancelado','aprobado'], default: 'pendiente'})
    estado: string;

    @OneToOne(() => Caso, caso => caso.consulta)
    caso: Caso;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
