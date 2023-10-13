import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCalculationDto {


    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    Id: string;

    @IsString()
    expression: string;
}
