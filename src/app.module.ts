import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { LeagueController } from './league/league.controller';
import { LeagueModule } from './league/league.module';
import { RegistrationService } from './registration/registration.service';
import { LeagueService } from './league/league.service';

@Module({
  imports: [UsersModule, AuthModule, LeagueModule],
  controllers: [AppController, UsersController, LeagueController],
  providers: [AppService, RegistrationService, LeagueService],
})
export class AppModule {}
