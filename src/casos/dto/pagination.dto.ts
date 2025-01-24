import { IsOptional, IsInt, IsString, IsEnum, IsPositive, Max, Min } from 'class-validator';

export class PaginationCasoDTO {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @IsOptional()
  @IsString()
  cedula?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  orderBy: string = 'createdAt';

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  orderDirection: 'ASC' | 'DESC' = 'DESC';
}
