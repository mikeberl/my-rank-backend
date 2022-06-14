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
  
  // test not important
  @UseGuards(JwtAuthGuard)            
  @Get('protected')
  getHello(@Request() req) : string {
    return this.appService.getHello();
  }

  // get one single user by id
  @UseGuards(JwtAuthGuard)            
  @Get('user')
  getUserById(@Body('id') id)  {
    return this.userService.getUser(id);
  }

  // get all the used username (usefull for the register section)
  @Get('usernames')
  getUsernames(@Request() req)  {
    return this.userService.getUsernames();
  }

  @Get('users')
  getUsers()  {
    return this.userService.getUsers();
  }

  // returns all the infos of the logged user and an access token
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) : any {
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() user) : any {
    console.log(user);
    this.userService.register(user);
    return;
  }

}
