'use strict';

import { applyMiddleware, createStore, IMiddleware, IReducer, IStore } from 'redux';
import * as middlewares from './middlewares';

export function createDefaultStore<S>(
    reducer: IReducer<S>,
    initialState?: S,
    ...extraMiddlewares: IMiddleware<S>[]): IStore<S> {

    return applyMiddleware<S>(middlewares.promise, ...extraMiddlewares)
        (createStore)(reducer, initialState);
}
