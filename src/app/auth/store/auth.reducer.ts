import { User } from "../user.model";
import * as  AuthActions  from "./auth.actions";

export interface state {
    user: User,
    authError: string,
    loading: boolean
}

const initialState: state = {
    user: null,
    authError: null,
    loading: false
}

export function authReducer(
    state=initialState, 
    action: AuthActions.AuthActions) {
    console.log(state);
    switch(action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.email, 
                action.payload.token,
                action.payload.userId, 
                action.payload.expirationDate)
            return {
                ...state, 
                user: user,
                authError: null,
                loading: false
            }
            
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            }

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                loading: true
            }

        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                loading: false
            }
        
        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}