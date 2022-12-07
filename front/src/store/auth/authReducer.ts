import { Action } from '../types';
import acions from './acions';
import { Auth } from './auth';
// const state: Auth = {};

function authReducer(state: Auth, action: Action): Auth {
    switch (action.type) {
        case acions.SET_AUTH:
            return {
                ...state,
                ...action.paylod,
            };
        default:
            return state;
    }
}

export default authReducer;
