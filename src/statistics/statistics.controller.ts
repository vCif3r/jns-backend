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
    totalEspecialidadByAbogados() {
        return this.statisticService.countEspecialidadAbogados();
    }

    @Get('tipo-cliente/count')
    totalClientesByTipo() {
        return this.statisticService.countTipoClientes();
    }
}
