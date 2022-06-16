
export interface User {
    id? : number;
    name?: string;
    username?: string;
    password?: string;
    img?: string | undefined;
    leagues?: string[];
    email?: string;
    access_token?: string;
}

/* export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',    
    EDITOR = 'editor',
    USER = 'user'
} */