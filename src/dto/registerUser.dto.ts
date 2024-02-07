import { IsNotEmpty, Length, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Le mot de passe est trop faible, choisissez un mot de passe plus fort de 6 à 12 caractères.',
  })
  password: string;
}
