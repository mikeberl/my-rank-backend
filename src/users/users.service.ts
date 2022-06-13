import { Injectable } from '@nestjs/common';

export type User = {
    id : number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 0,
            name: 'Michele',
            username: 'Mike',
            password: '111'
        },
        { 
            id: 1,
            name: 'Marco',
            username: 'mm',
            password: '222'
        },
        {
            id: 3,
            name: 'Rudiger',
            username: 'Scarso',
            password: 'password'
        },
    ];

    async findOne(username : string) : Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
