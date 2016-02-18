'use strict';

import { Action, ActionType } from './actions';
import { IReducer } from 'redux';

export interface ActionReducer<T, S> {
    (state: S, data: T): S;
}

export interface PromiseReducers<T, U, S> {
    fulfilled?: ActionReducer<U, S>;
    rejected?: ActionReducer<Error, S>;
    pending?: ActionReducer<T, S>;
}

const identity = (x: any) => x;

export function asyncActionReducer<T, U, S>(
    type: ActionType,
    defaultState: S,
    reducers: PromiseReducers<T, U, S>): IReducer<S> {

    let pending: ActionReducer<T, S> = reducers.pending || identity;
    let fulfilled: ActionReducer<U, S> = reducers.fulfilled || identity;
    let rejected: ActionReducer<Error, S> = reducers.rejected || identity;

    return (state: S = defaultState, action: Action<any>): S => {
        if (action.type !== type && type != null) {
            return state;
        }

        let status = action.meta && action.meta.status || null;
        switch (status) {
            case 'pending':
                return pending(state, action.payload);
            case 'fulfilled':
                return fulfilled(state, action.payload);
            case 'rejected':
                return rejected(state, action.error);
            default:
                throw new Error(`Unexpected meta.status '${status}'`);
        }
    };
}
