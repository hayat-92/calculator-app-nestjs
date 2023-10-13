import * as mongoose from 'mongoose';

export const CalculationSchema = new mongoose.Schema({
    expression: String,
    result: Number,
    userId: String,
    name: {
        type: String,
        default: ""
    }
}, { timestamps: true });
