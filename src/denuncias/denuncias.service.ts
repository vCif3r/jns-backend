import { Injectable } from '@nestjs/common';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
// import { UpdateDenunciaDto } from './dto/update-denuncia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Denuncia } from './entities/denuncia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DenunciaService {
  constructor(
    @InjectRepository(Denuncia)
    private readonly denunciaRepository: Repository<Denuncia>,
  ) {}

  // Función para generar un código único
  private generateUniqueCode(): string {
    const timestamp = Date.now().toString(36); // Convierte el timestamp a base36 para hacerlo más corto
    const randomPart = Math.random().toString(36).substring(2, 8); // Genera una cadena aleatoria
    return `C-${timestamp}-${randomPart}`; // Ejemplo de formato para el código único
  }

  async create(createDenunciaDto: CreateDenunciaDto) {
    const denuncia = this.denunciaRepository.create({
      ...createDenunciaDto,
      codigo: this.generateUniqueCode(), // Asignamos el código único al crear la denuncia
    });
    return this.denunciaRepository.save(denuncia);
  }

  findAll() {
    return this.denunciaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} denuncia`;
  }


  remove(id: number) {
    return `This action removes a #${id} denuncia`;
  }
}
