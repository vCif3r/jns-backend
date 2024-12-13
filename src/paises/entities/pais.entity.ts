import { Abogado } from 'src/abogados/entities/abogado.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('paises')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Cliente, cliente => cliente.pais)
  clientes: Cliente[];

  @OneToMany(() => Admin, admin => admin.pais)
  admins: Admin[];

  @OneToMany(() => Abogado, abogado => abogado.pais)
  abogados: Abogado[];
}
