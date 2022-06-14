import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => UsersModule), 
    AuthModule, 
    JwtModule.register({
      secret: 'SECRET',
    }),
    ],
  providers: [AuthService, LocalStrategy, JwtAuthGuard, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
