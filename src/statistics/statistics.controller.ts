import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticService: StatisticsService) {}
    // Implement statistics endpoints here...
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin','SuperAdmin')
    @Get('cards')
    statisticsCards() {
        return this.statisticService.statisticsCards();
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin','SuperAdmin')
    @Get('latest/abogados')
    getLastAbogados() {
        return this.statisticService.getLatesAbogados();
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin','SuperAdmin')
    @Get('casos-consultas-por-mes')
    async getCasosPorMes() {
      return this.statisticService.getCasosYConsultasPorMes();
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin','SuperAdmin')
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

    @UseGuards(AuthGuard, RolesGuard)
    @Roles('Admin','SuperAdmin')
    @Get('servicios/count/consultas')
    totalServiciosConsultas() {
        return this.statisticService.countConsultasByServicio();
    }

    @Get('caracteristicas')
    getCaracteristicasHome(){
        return this.statisticService.getCaracteristicasHome();
    }
}
