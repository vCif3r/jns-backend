import { Abogado } from "src/abogados/entities/abogado.entity";
import { Cliente } from "src/clientes/entities/cliente.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('demandas')
export class Demanda {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false, type: 'enum', enum: ['Civil','Laboral','Familiar','Comercial','Otro']})
    tipo: string;
    @Column({nullable: false})
    titulo: string;
    @Column({nullable: false, type: 'varchar', length: 1000 })
    descripcion: string;
    @CreateDateColumn()
    fecha_creacion: Date;
    @ManyToOne(() => Cliente, c => c.demandas)
    cliente: Cliente;
    @ManyToOne(() => Abogado, a => a.demandas)
    abogado: Abogado;
    @Column({nullable: false, type: 'enum', enum: ['En inicio','En trámite','Resuelto en primera instancia','En apelación','Con casación','Resuelto'], default: 'En inicio'})
    estado: string;
}
