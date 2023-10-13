import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculationController } from './calculation/calculation.controller';
import { CalculationService } from './calculation/calculation.service';
import { UserController } from './auth/user.controller';
import { UserService } from './auth/user.service';
import { UserSchema } from './auth/user.model';
import { JwtStrategy } from './auth/passport.strategy';
import { PassportModule } from '@nestjs/passport';
import { CalculationSchema } from './calculation/calculation.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.z2ywpoc.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{ name: 'Calculation', schema: CalculationSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [CalculationController, UserController],
  providers: [CalculationService, UserService, JwtStrategy],
})
export class AppModule { }
