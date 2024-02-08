import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
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
  password: string;
}
