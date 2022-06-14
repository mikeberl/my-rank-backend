import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './users.service';

@Module({
  imports: [AuthModule],
  providers: [UsersService],
  exports: [ UsersService]
})
export class UsersModule {}
