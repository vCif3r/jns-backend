import { Pais } from "../entities/pais.entity";

export type CreatePaiseDto = Omit<Pais, 'id' | 'createdAt' | 'updatedAt'>
