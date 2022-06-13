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


    getUser(id: number) {
        return this.users.find(user => user.id === id);
    }
}
