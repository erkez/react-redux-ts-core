import Promise = require('bluebird');
import { IActionGeneric } from 'redux';
export declare type ActionType = string;
export declare type Action<T> = IActionGeneric<T>;
export declare type AsyncAction<T, U> = Action<AsyncActionPayload<T, U>>;
export interface AsyncActionPayload<T, U> {
    data: T;
    promise: Promise<U>;
}
export interface ActionCreator<T, U> {
    (data?: T): Action<U>;
}
export declare type AsyncActionCreator<T, U> = ActionCreator<T, AsyncActionPayload<T, U>>;
export interface Mapper<T, R> {
    (data?: T): R;
}
export declare function createAction<T, R>(type: ActionType, mapper: Mapper<T, R>): ActionCreator<T, R>;
export declare function createAsyncAction<T, R>(type: ActionType, mapper: Mapper<T, Promise<R>>): AsyncActionCreator<T, R>;
