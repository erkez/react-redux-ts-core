import { ActionType } from './actions';
import { IReducer } from 'redux';
export interface ActionReducer<T, S> {
    (state: S, data: T): S;
}
export interface PromiseReducers<T, U, S> {
    fulfilled?: ActionReducer<U, S>;
    rejected?: ActionReducer<Error, S>;
    pending?: ActionReducer<T, S>;
}
export declare function asyncActionReducer<T, U, S>(type: ActionType, defaultState: S, reducers: PromiseReducers<T, U, S>): IReducer<S>;
