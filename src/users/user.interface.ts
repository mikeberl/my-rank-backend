
export interface User {
    id? : number;
    name?: string;
    username?: string;
    password?: string;
    img?: string | undefined;
    leagues?: string[];
    email?: string;
}

export enum UserRole {
    ADMIN = 'admin',
    CHIEFEDITOR = 'chiefeditor',    
    EDITOR = 'editor',
    USER = 'user'
}