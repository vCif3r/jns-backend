import { Caso } from "src/casos/entities/caso.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('consultas')
export class Consulta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    demandante: string;

    @Column()
    email: string;

    @Column({type: 'text'})
    detalles: string;

    @ManyToOne(() => Servicio, servicio => servicio.consultas)
    servicio: Servicio;

    @Column({type: 'date'})
    fecha: Date;

    @Column({type: 'time'})
    hora: string;

    @Column({type: 'text'})
    hechos: string;

    @OneToOne(() => Caso, caso => caso.consulta)
    caso: Caso;
}
