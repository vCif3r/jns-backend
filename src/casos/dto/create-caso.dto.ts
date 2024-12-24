import { Caso } from "../entities/caso.entity";

export type CreateCasoDto = Omit<Caso, 'id' | 'createdAt' | 'updatedAt' | 'codigo' | 'estado'>;
