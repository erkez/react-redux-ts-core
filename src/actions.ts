'use strict';

import Promise = require('bluebird');
import Redux = require('redux');

export type ActionType = string;
export type Action<T> = Redux.IActionGeneric<T>;

export interface AsyncActionPayload<T, U> {
    data: T;
    promise: Promise<U>;
}

export interface ActionCreator<T, U> {
    (data: T): Action<U>;
}

export type AsyncActionCreator<T, U> = ActionCreator<T, AsyncActionPayload<T, U>>;

export interface Mapper<T, R> {
    (data: T): R
}

export function createAction<T, R>(type: ActionType, mapper: Mapper<T, R>): ActionCreator<T, R> {
    return (data: T): Action<R> => {
        return {
            type,
            payload: mapper(data)
        };
    };
}

export function createAsyncAction<T, R>(
    type: ActionType,
    mapper: Mapper<T, Promise<R>>): AsyncActionCreator<T, R> {

    return createAction<T, AsyncActionPayload<T, R>>(type, data => {
        return {
            data,
            promise: mapper(data)
        }
    });
}
