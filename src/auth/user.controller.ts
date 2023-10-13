import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() userDto: UserDto) {
        let response = await this.userService.register(userDto);
        if (response.success) {
            return response;
        } else {
            throw new HttpException(
                response.message,
                response.status
            );
        }
    }

    @Post('login')
    async login(@Body() userDto: UserDto) {
        let response = await this.userService.login(userDto);
        if (response.success) {
            return response;
        } else {
            throw new HttpException(
                response.message,
                response.status
            );
        }
    }
}
