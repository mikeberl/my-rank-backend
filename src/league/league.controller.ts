import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LeagueService } from './league.service';

@Controller('league')
export class LeagueController {

    constructor(private leagueService : LeagueService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get('by-user')
    editName(@Param() params) {
        return this.leagueService.getByUser(params.Uid);
    }
}
