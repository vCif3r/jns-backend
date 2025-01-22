import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('notificationes')
export class Notificacion {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    mensaje: string;
  
    @Column({ default: false })
    leido: boolean;
  
    @ManyToOne(() => User, user => user.notificaciones)
    @JoinColumn({ name: 'userId' })
    user: User; // Relación con el usuario
  
    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
