import { Injectable } from '@nestjs/common';

export type User = {
    id : number;
    name: string;
    username: string;
    password: string;
    img: string | undefined;
    leagues: string[];
    email: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 0,
            name: 'Michele',
            username: 'Mike',
            password: '111',
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
        { 
            id: 1,
            name: 'Marco',
            username: 'mm',
            password: '222',
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
        {
            id: 3,
            name: 'Rudiger',
            username: 'Scarso',
            password: 'password',
            img: undefined,
            leagues : [],
            email: 'berlanda94@gmail.com'
        },
    ];

    async findOne(username : string) : Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }


    async getUser(id: number) {
        return this.users.find(user => user.id === id);
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
        console.log("Out: " + i)
        return i;
    }

    async register(new_user: any) {
        const user : User = {
            id: this.getNewId(),
            name: new_user.name,
            username: new_user.username,
            password: new_user.password,
            img: undefined,
            leagues : [],
            email: new_user.email
        }
        this.users.push(user);
        console.log(this.users)
        return;
    }

    async getUsers() {
        return this.users;
    }
}
