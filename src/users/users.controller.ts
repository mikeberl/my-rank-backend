import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {

    }

    @UseGuards(JwtAuthGuard) 
    @Put('edit-name')
    editName(@Param() params) {
        console.log(params.name);
        return this.userService.editName(params.id, params.name);
    }

    @UseGuards(JwtAuthGuard) 
    @Put('edit-username')
    editUsername(@Param() params) {
        return this.userService.editUsername(params.id, params.username);
    }

    @UseGuards(JwtAuthGuard) 
    @Put('edit-password')
    editPassword(@Param() params) {
        return this.userService.editName(params.id, params.password);
    }

    @UseGuards(JwtAuthGuard) 
    @Put('join-league')
    joinLeague(@Param() params) {
        return this.userService.joinLeague(params.id, params.league);
    }

    @UseGuards(JwtAuthGuard) 
    @Put('leave-league')
    leaveLeague(@Param() params) {
        return this.userService.joinLeague(params.id, params.league);
    }

    @Get('refresh-token')
    refreshToken(@Param() params) {
        return this.userService.refreshAccessToken(params.id, params.username, params.password);
    }
}
