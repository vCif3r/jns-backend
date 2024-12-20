import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos-servicios')
export class TiposServicio {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column({type: 'text', nullable: true})
    descripcion: string;
    @ManyToOne(() => Servicio, servicio => servicio.tipos_servicios)
    servicio: Servicio
}
