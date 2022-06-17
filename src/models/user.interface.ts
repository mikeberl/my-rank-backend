
export interface User {
    Uid? : number;
    name?: string;
    username?: string;
    password?: string;
    img?: string | undefined;
    email?: string;
    access_token?: string;
}

/* export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',    
    EDITOR = 'editor',
    USER = 'user'
} */