import { Consulta } from "src/consultas/entities/consulta.entity";
import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos-servicios')
export class TiposServicio {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column({type: 'text', nullable: true})
    descripcion: string;
    // @ManyToOne(() => Servicio, servicio => servicio.tipos_servicios, { cascade: true })
    // servicio: Servicio
    @Column({default: true})
    estado: boolean;
    
}
