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

    @Get('casos-consultas-por-mes')
    async getCasosPorMes() {
      return this.statisticService.getCasosYConsultasPorMes();
    }

    @Get('especialidad/count')
    totalEspecialidadByAbogados() {
        return this.statisticService.countEspecialidadAbogados();
    }

    // @Get('tipo-cliente/count')
    // totalClientesByTipo() {
    //     return this.statisticService.countTipoClientes();
    // }

    // @Get('tiposervicios/count/consultas')
    // totalTipoServiciosConsultas() {
    //     return this.statisticService.countConsultasByTpService();
    // }

    @Get('servicios/count/consultas')
    totalServiciosConsultas() {
        return this.statisticService.countConsultasByServicio();
    }
}
