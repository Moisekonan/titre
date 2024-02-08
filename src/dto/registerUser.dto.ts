import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    description: "Le nom d'utilisateur.",
    example: 'CodeOz',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Le mot de passe.',
    example: 'Password123',
  })
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Le mot de passe est trop faible, choisissez un mot de passe plus fort de 6 à 12 caractères.',
  })
  password: string;
}
