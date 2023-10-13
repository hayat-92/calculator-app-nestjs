import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>) { }

    async register(userDto: UserDto) {
        const { username, password } = userDto;
        console.log('userDto', userDto)
        const IsExisted = await this.userModel.findOne({ username }).exec();
        if (IsExisted) {
            return {
                success: false,
                message: 'User already existed!',
                status: 409
            };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new this.userModel({ username, password: hashedPassword });
        let data = await user.save();
        return {
            success: true,
            data
        }
    }

    async login(userDto: UserDto) {
        const { username, password } = userDto;

        const user = await this.userModel.findOne({ username }).exec();
        if (!user) {
            return {
                success: false,
                message: 'User not found!',
                status: 404
            };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Password is invalid!',
                status: 400
            };
        }

        // Create a JWT token
        const token = sign({ sub: user._id, username: user.username }, '12345', { expiresIn: '1h' });

        return {
            success: true,
            token,
            user: {
                username: user.username,
                userId: user._id
            }
        };
    }
}
