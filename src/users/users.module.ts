import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [AuthModule],
  providers: [UsersService],
  exports: [ UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
