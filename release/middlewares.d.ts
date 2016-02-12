import { IDispatch } from 'redux';
import { AsyncAction } from './actions';
export declare type GenericAsyncAction = AsyncAction<any, any>;
export interface AsyncDispatch extends IDispatch {
    (action: GenericAsyncAction): GenericAsyncAction;
}
export declare function promise<S>(): (next: AsyncDispatch) => AsyncDispatch;
