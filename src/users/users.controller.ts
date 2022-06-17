import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '../models/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {

    }

    // get all users
  @Get()
  getUsers()  {
    return this.userService.getUsers();
  }

    @UseGuards(JwtAuthGuard)
    @Put('edit-name')
    editName(@Body() body) : Observable<Object> {
        return this.userService.editName(body.id, body.name).pipe(
            map((name : string) => {
                return { name : name};
            })
        );
    }

    @UseGuards(JwtAuthGuard) 
    @Put('edit-username')
    editUsername(@Body() body) {
        return this.userService.editUsername(body.id, body.username).pipe(
            map((name : string) => {
                return { name : name};
            })
        );
    }

    @UseGuards(JwtAuthGuard) 
    @Put('edit-password')
    editPassword(@Body() body) {
        return this.userService.editUsername(body.id, body.password).pipe(
            map((name : string) => {
                return { name : name};
            })
        );
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
