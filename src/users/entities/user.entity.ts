import { Exclude } from 'class-transformer';
import { Caso } from 'src/casos/entities/caso.entity';
import { Consulta } from 'src/consultas/entities/consulta.entity';
import { Notificacion } from 'src/notificaciones/entities/notificacion.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    cedula: string;

    @Column({nullable: true})
    direccion: string;

    @Column()
    telefono: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['Individual', 'Empresa'], nullable: true })
    tipo_cliente?: string;

    @Column({ type: 'enum', enum: ['Civil', 'Penal', 'Laboral'], nullable: true })
    especialidad?: string;

    @Column({ type: 'date', nullable: true  })
    fecha_nacimiento?: string;

    @Column({nullable: true})
    genero: string;

    @Column({ nullable: true })
    foto: string;

    @Column({nullable: true})
    estado_civil: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({nullable: true})
    pais: string;

    // @OneToMany(() => Caso, (caso) => caso.cliente)
    // casosCliente: Caso[];

    // @OneToMany(() => Caso, (caso) => caso.abogado)
    // casosAbogado: Caso[];
    @OneToMany(() => Consulta, (consulta) => consulta.abogado)
    consultasAbogado: Consulta[];

    @ManyToOne(()=> Role, (role) => role.users)
    role: Role;

    @Column({default: true})
    disponible: boolean;

    @OneToMany(()=> Notificacion, (nt) => nt.user)
    notificaciones: Notificacion
}
