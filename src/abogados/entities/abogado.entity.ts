import { Exclude } from "class-transformer";
import { Caso } from "src/casos/entities/caso.entity";
import { Demanda } from "src/demandas/entities/demanda.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('abogados')
export class Abogado {
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

    @Column({type: 'enum',enum: ['Civil','Penal','Laboral'] })
    especialidad: string;

    // @Column()
    // fecha_ingreso: Date;

    @Column({ type: 'enum', enum: ['Masculino','Femenino','Otro']})
    genero: string;

    @Column({nullable: true})
    foto: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
    
    @Column()
    pais: string

    @OneToMany(() => Demanda, demanda => demanda.abogado)
    demandas: Demanda[]

    @OneToMany(() => Caso, a => a.abogado)
    casos: Caso[]
}
