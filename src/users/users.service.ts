import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from '../models/user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            Uid: 0,
            name: 'Michele',
            username: 'Mike',
            password: '111',
            //password: this.authService.hashPassword2('111'),
            img: undefined,
            email: 'berlanda94@gmail.com'
        },
        { 
            Uid: 1,
            name: 'Marco',
            username: 'mm',
            password: '222',
            //password: this.authService.hashPassword2('222'),
            img: undefined,
            email: 'berlanda94@gmail.com'
        },
        {
            Uid: 3,
            name: 'Rudiger',
            username: 'Scarso',
            password: 'password',
            //password: this.authService.hashPassword2('password'),
            img: undefined,
            email: 'berlanda94@gmail.com'
        },
    ];

    constructor(private authService: AuthService) {}

    async findOne(username : string) : Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


    async findOneById(id: number) {
        return this.users.find(user => user.Uid === id);
    }

    async getUserByUsername(username: string) {
        return this.users.find(user => user.username === username);
    }

    async getUsernames() {
        var usernames : string[] = [];
        for (let u of this.users) {
            usernames.push(u.username);
        }
        return usernames;
    }

    getNewId() {
        var i = 0;
        while (i >= 0) {
            var check_if_exist = false;
            for (let u of this.users) {
                if (i === u.Uid) {
                    check_if_exist = true;
                    break;
                }
            }
            if (check_if_exist === false) {
                break;
            }
            i++;
        }
        return i;
    }

    async register(new_user: any) {
        const user : User = {
            Uid: this.getNewId(),
            name: new_user.name,
            username: new_user.username,
            password: new_user.password,
            //password: this.authService.hashPassword2(new_user.password),
            img: undefined,
            email: new_user.email
        }
        this.users.push(user);
        // console.log(this.users)
        return;
    }

    login(user: any) {
        return this.validateUser(user.username, user.password).pipe(
            map((user: User) => {
                console.log(user);
                if(user) {
                    user.access_token = this.authService.generateJWT2(user);
                    return user;
                } else {
                    return 'Wrong Credentials';
                }
            })
        )
    }

    validateUser(username: string, password: string): Observable<User> {
        return from(this.findOne(username)).pipe(
            
                map((user : User) => {
                    // TODO : saved_ password is possibly null, warning
                    //if(this.authService.comparePasswords2(password, user.password)) {
                    if (password === user.password) {
                        const {password, ...result} = user;
                        return result;
                    } else {
                        throw Error;
                    }
                }
            ))
    }

    async getUsers() {
        return this.users;
    }

    editName(id : number, name : string) {
        return from(this.findOneById(id)).pipe(            
            map((user : User) => {
                user.name = name;
                return name;
            }
        ))
    }

    editUsername(id : number, username : string) {
        return from(this.findOneById(id)).pipe(            
            map((user : User) => {
                user.username = username;
                return username;
            }
        ))
    }

    editPassword(id : number, password : string) {
        return from(this.findOneById(id)).pipe(            
            map((user : User) => {
                user.password = password;
                return password;
            }
        ))
    }

    joinLeague(id : number, league : string) {
        return true;
    }

    leaveLeague(id : number, league : string) {
        return true;
    }

    refreshAccessToken(id : number, username : string, password : string) {
        return true;
    }


}
