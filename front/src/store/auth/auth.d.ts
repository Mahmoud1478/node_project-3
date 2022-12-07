import { User } from '../users/users';

export type Auth = {
    user: User | null;
    cart: Record<string, string>;
    token: {
        type: string;
        value: string;
    };
};
