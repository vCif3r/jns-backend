import { Servicio } from "src/servicios/entities/servicio.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('areas')
export class Area {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string 
    @Column()
    descripcion: string
    @CreateDateColumn()
    createdAt: Date 
    @UpdateDateColumn()
    updateAt: Date
    @Column({type: 'boolean', default: false})
    publicado: boolean;
    @OneToMany(()=> Servicio, servicio => servicio.area)
    servicios: Servicio[]
}
