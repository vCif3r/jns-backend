import { Demanda } from "../entities/demanda.entity";

export type CreateDemandaDto = Omit<Demanda, 'fecha_creacion' | 'abogado' | 'estado'>
