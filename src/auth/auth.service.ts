import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) {}

  async register(registerDTO: RegisterUserDto) {
    const { username, password } = registerDTO;
    const hashed = await bcrypt.hash(password, 12);
    const salt = bcrypt.getSalt(hashed);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    user.salt = salt;

    this.userRepository.create(user);

    try {
      return await this.userRepository.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        "Un problème s'est produit, l'utilisateur n'a pas été créé.",
      );
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const { username, password } = userLoginDto;

    const user = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException(
        "Informations d'identification invalides.",
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1h',
        algorithm: 'HS256',
      });
      return { token: jwtToken };
    } else {
      throw new UnauthorizedException(
        "Informations d'identification invalides.",
      );
    }
  }

  async logout(user: UserEntity) {
    const token = await this.jwt.signAsync(
      {username: user.username},
      { expiresIn: 0, algorithm: 'HS256' },
    );
    return { token };
  }
}
