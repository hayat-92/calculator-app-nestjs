import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCalculationDto } from './create-calculation.dto';
import { evaluate, round, parse } from 'mathjs';


@Injectable()
export class CalculationService {
    constructor(@InjectModel('Calculation') private readonly calculationModel: Model<CreateCalculationDto>) { }

    isExpressionValid(
        expression: string,
    ) {
        try {
            parse(expression);
            return true;
        } catch (error) {
            return false;
        }
    }

    async createCalculation(userId: string, createCalculationDto: CreateCalculationDto) {
        const { name = "", Id, expression } = createCalculationDto;
        let IsValid = this.isExpressionValid(expression);
        if (!IsValid) {
            return { success: false, message: "Invalid Expression", status: 200 };
        }

        try {
            const result = round(evaluate(expression), 2);
            if (Id) {
                let cal = await this.calculationModel.findByIdAndUpdate(Id, { expression, result, name });
                return { success: true, data: cal };
            } else {
                const calculation = new this.calculationModel({ expression, result, userId, name });
                let data = await calculation.save();
                return { success: true, data };
            }
        } catch (error) {
            return { success: false, message: "something went wrong", status: 500 };
        }
    }

    async getCalculationHistory(
        userId: string,
    ): Promise<CreateCalculationDto[]> {
        return this.calculationModel.find({ userId }).exec();
    }

    async deleteCalculation(id: string): Promise<boolean> {
        const deleted = await this.calculationModel.findByIdAndDelete(id);
        return !!deleted;
    }
}
