import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';

@Module({
  providers: [LeagueService]
})
export class LeagueModule {}
