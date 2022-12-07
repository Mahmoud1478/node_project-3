import React, { createContext, ReactNode, useReducer } from 'react';
import { Auth } from './auth/auth';
import authReducer from './auth/authReducer';
// import AuthContext from './auth/AuthContext';
import { Action } from './types';
import { User } from './users/users';

export interface State {
    auth: Auth;
    setAuth: React.Dispatch<Action>;
}

type props = {
    children: React.ReactNode[];
};
type ConsumStateProps = {
    // eslint-disable-next-line no-unused-vars
    children: (value: State) => ReactNode[] | ReactNode;
};

export const StateContext = createContext<State>({} as State);

export function ConsumState({ children }: ConsumStateProps) {
    return <StateContext.Consumer>{children}</StateContext.Consumer>;
}
function Povider({ children }: props) {
    const [auth, setAuth] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem('user') as string) as User,
        cart: {} as Record<string, string>,
        token: JSON.parse(localStorage.getItem('token') as string),
    });
    return (
        <StateContext.Provider
            value={{
                auth,
                setAuth,
            }}
        >
            {children}
        </StateContext.Provider>
    );
}
export default Povider;
