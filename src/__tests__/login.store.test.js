import { expect } from '@jest/globals';
import { AppInitialState } from '../store/AppInitialState';
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from '../store/login/login.actions';
import { loginReducer } from '../store/login/login.reducers';

describe('Login store', () => {

    it('recoverPassword', () => {
        const initialState = {...AppInitialState}
        const newState = loginReducer(initialState, recoverPassword());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: false,
            isRecoveringPassword: true
        })
    })

    it('recoverPasswordSuccess', () => {
        const initialState = {
            ...AppInitialState.login,
            isRecoveringPassword: true
        };
        const newState = loginReducer(initialState, recoverPasswordSuccess());

        expect(newState).toEqual({
            ...initialState,
            error: null,
            isRecoveredPassword: true,
            isRecoveringPassword: false
        })
    })

    it('recoverPasswordFail', () => {
        const initialState = {
            ...AppInitialState.login,
            isRecoveringPassword: true
        };
        const error ={message: 'error'};
        const newState = loginReducer(initialState, recoverPasswordFail(error));

        expect(newState).toEqual({
            ...initialState,
            error,
            isRecoveredPassword: false,
            isRecoveringPassword: false
        })
    })

})