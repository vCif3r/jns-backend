
import { Consulta } from "src/consultas/entities/consulta.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => Consulta, consulta => consulta.caso, {cascade: false})
    @JoinColumn()
    consulta: Consulta;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date; // timestamp automatically generated

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date; // timestamp automatically updated


    @BeforeInsert()
    generarCodigoUnico() {
        this.codigo = this.generarCodigo();
    }
    private generarCodigo(): string {
        return 'C-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
}
