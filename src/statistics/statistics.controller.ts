import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticService: StatisticsService) {}
    // Implement statistics endpoints here...
    @Get('/abogados')
    countAbogados(){
        return this.statisticService.countAbogados();
    }

    @Get('/clientes')
    countClientes(){
        return this.statisticService.countClientes();
    }

    @Get('especialidad/count')
    getAbogadosEspecialidad() {
        return this.statisticService.countEspecialidadAbogados();
    }
}
