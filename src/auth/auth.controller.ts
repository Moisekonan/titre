import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/entities/user.entity';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) userCreateDto: RegisterUserDto) {
    return this.authService.register(userCreateDto);
  }

  @Post('login')
  login(@Body(ValidationPipe) userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

    @Post('logout')
    @UseGuards(AuthGuard())
    logout(@User() user: UserEntity) {
      return this.authService.logout(user);
    }
}
