import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
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

  @ApiProperty({
    description: 'L\'email.',
    example: 'email@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Le prénom.',
    example: 'Jean',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Le nom de famille.',
    example: 'Dupont',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Le numéro de téléphone.',
    example: '0601020304',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'La date de naissance.',
    example: '1990-01-01',
  })
  @IsNotEmpty()
  dateOfBirth: string;
}
