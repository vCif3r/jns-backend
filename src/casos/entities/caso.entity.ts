
import { Consulta } from "src/consultas/entities/consulta.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('casos')
export class Caso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    codigo: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: ['En inicio','En trámite','Resuelto en primera instancia','En apelación','Con casación','Resuelto','Cancelado'],
        default: 'En inicio'
    })
    estado: string;

    @ManyToOne(() => User, c => c.casosCliente)
    cliente: User;

    @ManyToOne(() => User, a => a.casosAbogado)
    abogado: User;

    @OneToOne(() => Consulta, consulta => consulta.caso)
    consulta: Consulta;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // timestamp automatically generated

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // timestamp automatically updated
}
