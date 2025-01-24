export class PaginationConsultaDTO{
    page: number = 1;
    pageSize: number = 10;
    servicio?: string;
    cedula?: string;
    fechaDesde: Date;
    fechaHasta: Date;
}