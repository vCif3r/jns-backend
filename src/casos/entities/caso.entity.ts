import { Abogado } from "src/abogados/entities/abogado.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('casos')
export class Caso {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    codigo: string;

    @Column({
        nullable: false,
        type: 'enum',
        enum: ['En inicio','En trámite','Resuelto en primera instancia','En apelación','Con casación','Resuelto'],
        default: 'En inicio'
    })
    estado: string;

    @ManyToOne(() => Cliente, c => c.casos)
    cliente: Cliente;

    @ManyToOne(() => Abogado, a => a.casos)
    abogado: Abogado;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // timestamp automatically generated

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // timestamp automatically updated
}
