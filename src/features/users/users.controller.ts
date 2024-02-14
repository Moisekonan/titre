import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Get('/:id/profile')
    getProfileByUserId(@Param('id') id: number) {
        return this.usersService.getProlfileByUserId(id);
    }
}
