import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticService: StatisticsService) {}
    // Implement statistics endpoints here...
    @Get('cards')
    statisticsCards() {
        return this.statisticService.statisticsCards();
    }

    @Get('latest/abogados')
    getLastAbogados() {
        return this.statisticService.getLatesAbogados();
    }

    @Get('casos-por-mes')
    async getCasosPorMes() {
      return this.statisticService.getCasosPorMes();
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
