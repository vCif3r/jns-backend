import { Denuncia } from "../entities/denuncia.entity";

export type CreateDenunciaDto = Omit<Denuncia, 'id' | 'createdAt'>