import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/features/auth/dto/registerUser.dto';
import { UserLoginDto } from 'src/features/auth/dto/userLogin.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { User } from './user.decorator';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User has been successfully registered.' })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  register(@Body(ValidationPipe) userCreateDto: RegisterUserDto) {
    return this.authService.register(userCreateDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  getProfile(@User() user: UserEntity) {
    return this.authService.getProfile(user);
  }

  @Post('logout')
  @UseGuards(AuthGuard())
  logout(@User() user: UserEntity) {
    return this.authService.logout(user);
  }
}
