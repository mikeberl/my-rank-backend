import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService, private jwtService : JwtService) 
    {}

    async validateUser(username : string, password : string) : Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && user.password === password) {
            const { password, username, ...rest} = user;
            return rest;
        }

        return null;
    }

    async login(user: any) {
        const payload = { name: user.name, sub : user.id}

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            img: user.img,
            leagues : user.leagues,
            email: user.email,
            access_token: this.jwtService.sign(payload),
        };
    }
}
