'use strict';

import Promise = require('bluebird');
import { IDispatch } from 'redux';
import { AsyncAction } from './actions';

export type GenericAsyncAction = AsyncAction<any, any>;

export interface AsyncDispatch extends IDispatch {
    (action: GenericAsyncAction): GenericAsyncAction;
}

export function promise<S>(): (next: AsyncDispatch) => AsyncDispatch {
    return next => (action: GenericAsyncAction) => {
        if (typeof action.payload !== 'object' ||
            !(action.payload.promise instanceof Promise)) {
            return next(action);
        }

        const type = action.type;
        const payload = action.payload;
        const meta = { status: 'pending' };

        next({
            type,
            payload: payload.data,
            meta
        });

        return payload.promise
            .tap(payload => {
                meta.status = 'fulfilled';
                next({type, payload, meta});
            })
            .catch(error => {
                meta.status = 'rejected';
                next({type, error, meta});
                throw error;
            });
    };
}
