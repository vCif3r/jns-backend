import { text } from "stream/consumers";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    titulo: string;

    @Column()
    categoria: string;
  
    @Column({type: 'text'})
    contenido: string;

    @Column({nullable: true})
    imagen: string;
  
    @Column()
    publicado: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
