import { User } from './user.model';

export class Peep {
    id: string;
    text: string;
    createdAt: Date;
    owner: User;
    likes: User[];
    reports: User[];
}
