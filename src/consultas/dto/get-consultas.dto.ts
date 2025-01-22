import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class GetConsultasDto {
  @IsOptional()
  @IsString()
  filtro?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize: number = 10;
}
