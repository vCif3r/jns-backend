import { Area } from "src/areas/entities/area.entity";
import { Consulta } from "src/consultas/entities/consulta.entity";
import { TiposServicio } from "src/tipos-servicios/entities/tipos-servicio.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('servicios')
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    nombre: string;

    @Column({type: 'text', nullable: false})
    descripcion: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // automatically generated
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // automatically generated

    @Column({type: 'boolean', default: false})
    publicado: boolean;

    // @OneToMany(() => TiposServicio, ts => ts.servicio)
    // tipos_servicios: TiposServicio[];

    @ManyToOne(()=> Area, area => area.servicios)
    area: Area;

    @OneToMany(() => Consulta, consulta => consulta.servicio)
    consultas: Consulta;
}
