import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LeagueService } from './league.service';

@Controller('leagues')
export class LeagueController {

    constructor(private leagueService : LeagueService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('by-user')
    getByUser(@Query('Uid') Uid) {
        var tmp = this.leagueService.getByUser(Uid);
        return { leagues : tmp};
    }


    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll() {
        var tmp = this.leagueService.getAll();
        return { leagues : tmp};
    }

    @UseGuards(JwtAuthGuard)
    @Get('not-joined')
    getNotJoined(@Body() body) {
        var tmp = this.leagueService.getNotJoined(body.Uid);
        return { leagues : tmp};
    }

    @Post('register')
    registerToLeague(@Body() body) {
        var tmp =  this.leagueService.newRegistration(body.Uid, body.Lid);
        return { registration : tmp}; 
    }

    @Delete('leave')
    leaveLeague(@Query('Uid') Uid, @Query('Lid') Lid) {
        var tmp =  this.leagueService.leaveLeague(Uid, Lid);
        return { registration : tmp}; 
    }

    @Post('create')
    createLeague(@Body() body) {
        var tmp = this.leagueService.createLeague(body);
        return { league : tmp };
    }
}
