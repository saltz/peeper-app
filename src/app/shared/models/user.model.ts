export class User {
    id: string;
    hash: string;
    alias: string;
    firstname: string;
    lastname: string;
    picture: string;
    email: string;
    location: string;
    website: string;
    role: string;
    biography: string;
    followers: User[];
    following: User[];
}
