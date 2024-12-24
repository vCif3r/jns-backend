import { Caso } from "src/casos/entities/caso.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { TiposServicio } from "src/tipos-servicios/entities/tipos-servicio.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('consultas')
export class Consulta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreCompleto: string;

    @Column()
    email: string;

    @Column({type: 'text'})
    detalles: string;

    @ManyToOne(() => TiposServicio, ts => ts.consultas)
    tipoServicio: TiposServicio;

    @ManyToOne(() => User, abogado => abogado.consultasAbogado, {nullable: true, cascade: false})
    abogado: User | null;

    @Column({type: 'date'})
    fecha: Date;

    @Column({type: 'time'})
    hora: string;

    @Column({type: 'text'})
    hechos: string;

    @Column({type: 'enum', enum: ['pendiente','revision','cancelado','finalizado'], default: 'pendiente'})
    estado: string;

    @OneToOne(() => Caso, caso => caso.consulta)
    caso: Caso;

    @CreateDateColumn({type: 'datetime'})
    createdAt: Date;

    @UpdateDateColumn({type: 'datetime'})
    updatedAt: Date;
}
