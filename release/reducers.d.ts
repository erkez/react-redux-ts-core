import { Action } from './actions';
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
export declare function createReducer<S>(initialState: S, configuration: ReducerConfiguration<S>): (state: S, action: Action<any>) => S;
