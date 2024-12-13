import { Cliente } from "../entities/cliente.entity";

export type CreateClienteDto =  Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>
