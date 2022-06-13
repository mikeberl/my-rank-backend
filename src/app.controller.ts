import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User, UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly authService: AuthService,
              private readonly userService: UsersService) {}
  
  @UseGuards(JwtAuthGuard)            
  @Get('protected')
  getHello(@Request() req) : string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)            
  @Get('user')
  getUser(@Body('id') id)  {
    return this.userService.getUser(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) : any {
    console.log(req.user);
    return this.authService.login(req.user);
  }

}
