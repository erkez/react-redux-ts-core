'use strict';

import { Action, ActionType } from './actions';
import { IReducer } from 'redux';

export interface ActionReducer<T, S> {
    (state: S, data: T): S;
}

export interface PromiseReducers<T, U, S> {
    pending?: ActionReducer<T, S>;
    fulfilled?: ActionReducer<U, S>;
    rejected?: ActionReducer<Error, S>;
}

export interface ReducerConfiguration<S> {
    [actionType: string]: (state: S, data: any) => S | PromiseReducers<any, any, S>;
}

const identity = (x: any) => x;

export function createReducer<S>(initialState: S, configuration: ReducerConfiguration<S>): (state: S, action: Action<any>) => S {
    return (state = initialState, action: Action<any>) => {
        let reducer = configuration[action.type];

        if (reducer == null) {
            return state;
        } else if (typeof reducer === 'function') {
            return reducer(state, action.payload);
        } else if (typeof reducer === 'object') {
            let status = action.meta && action.meta.status || null;
            let pending: ActionReducer<any, S> = (reducer as PromiseReducers<any, any, S>).pending || identity;
            let fulfilled: ActionReducer<any, S> = (reducer as PromiseReducers<any, any, S>).fulfilled || identity;
            let rejected: ActionReducer<Error, S> = (reducer as PromiseReducers<any, any, S>).rejected || identity;

            switch (status) {
                case 'pending':
                    return pending(state, action.payload);
                case 'fulfilled':
                    return fulfilled(state, action.payload);
                case 'rejected':
                    return rejected(state, action.error);
                default:
                    return state;
            }
        } else {
            throw new Error('Invalid `createReducer` configuration.');
        }
    };
}
