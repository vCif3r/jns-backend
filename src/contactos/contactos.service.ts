import { Injectable } from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactosService {
  constructor(
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
  ){}

  create(createContactoDto: CreateContactoDto) {
    const contacto = this.contactoRepository.create(createContactoDto);
    return this.contactoRepository.save(contacto);
  }

  findAll() {
    return this.contactoRepository.find();
  }

  findOne(id: number) {
    return this.contactoRepository.findOne({
      where: { id: id },
    });
  }

  update(id: number, updateContactoDto: UpdateContactoDto) {
    return `This action updates a #${id} contacto`;
  }

  remove(id: number) {
    return `This action removes a #${id} contacto`;
  }
}
