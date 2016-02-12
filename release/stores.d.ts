import { IMiddleware, IReducer, IStore } from 'redux';
export declare function createDefaultStore<S>(reducer: IReducer<S>, initialState?: S, ...extraMiddlewares: IMiddleware<S>[]): IStore<S>;
