import { Injectable } from '@nestjs/common';
import { from, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 0,
            name: 'Michele',
            username: 'Mike',
            password: this.authService.hashPassword2('111'),
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
        { 
            id: 1,
            name: 'Marco',
            username: 'mm',
            password: this.authService.hashPassword2('222'),
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
        {
            id: 3,
            name: 'Rudiger',
            username: 'Scarso',
            password: this.authService.hashPassword2('password'),
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
    ];

    constructor(private authService: AuthService) {}

    async findOne(username : string) : Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


    async getUserById(id: number) {
        return this.users.find(user => user.id === id);
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
                if (i === u.id) {
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
            id: this.getNewId(),
            name: new_user.name,
            username: new_user.username,
            password: await this.authService.hashPassword2(new_user.password),
            img: undefined,
            leagues : [],
            email: new_user.email
        }
        this.users.push(user);
        console.log(this.users)
        return;
    }

    create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            map((passwordHash: string) => {
                const tmp : User = {
                    id: this.getNewId(),
                    name: user.name,
                    username: user.username,
                    password: passwordHash,
                    img: user.img,
                    leagues : [],
                    email: user.email
                }
                this.users.push(tmp);
                return tmp;

                /* return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                ) */
            })
        )
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
                    if(this.authService.comparePasswords2(password, user.password)) {
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
}
