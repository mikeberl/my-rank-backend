import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './models/user.interface';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly userService: UsersService) {}
  

  // get one single user by id
  @UseGuards(JwtAuthGuard)            
  @Get('user')
  getUserById(@Body('id') id)  {
    return this.userService.findOneById(id);
  }

  // get all the used username (usefull for the register section)
  @Get('usernames')
  getUsernames(@Request() req)  {
    return this.userService.getUsernames();
  }



@Post('login')
login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
        map((user: User) => {
            // console.log(user);
            return { user: user };
        })
    )
}

@Post('register')
  register(@Body() body : any) : any {
    return this.userService.register(body.user);
  }

}
