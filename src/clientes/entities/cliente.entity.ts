import { Exclude } from "class-transformer";
import { Demanda } from "src/demandas/entities/demanda.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clientes')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({unique: true})
    cedula: string;

    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @Column({unique: true})
    email: string;
    
    @Exclude() 
    @Column({})
    password: string;

    @Column({type: 'enum', enum: ['Individual','Empresa']})
    tipo_cliente: string;

    @Column({ type: 'date' })
    fecha_nacimiento: string;

    @Column()
    genero: string;

    @Column({nullable: true})
    foto: string;

    @Column()
    estado_civil: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
   
    @Column()
    pais: string;

    @OneToMany(() => Demanda, demanda => demanda.cliente)
    demandas: Demanda[]
}
