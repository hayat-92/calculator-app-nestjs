import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculationService } from './calculation.service';
import { CreateCalculationDto } from './create-calculation.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('calculation')
export class CalculationController {
    constructor(private readonly calculationService: CalculationService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createCalculation(@Request() req, @Body() createCalculationDto: CreateCalculationDto) {
        try {
            let userId = req.user.userId;
            let data = await this.calculationService.createCalculation(userId, createCalculationDto);
            if (data.success) {
                return data;
            } else {
                throw new HttpException(
                    data.message,
                    data.status
                );
            }

        } catch (e) {
            throw new HttpException(
                e.message,
                e.status
            );
        }



    }

    @UseGuards(JwtAuthGuard)
    @Get('history')
    async getCalculationHistory(@Request() req) {
        return this.calculationService.getCalculationHistory(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCalculation(@Param('id') id: string) {
        return this.calculationService.deleteCalculation(id);
    }
}
