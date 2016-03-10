import {PromiseReducers} from "../src/reducers";
'use strict';

import Promise = require('bluebird');
import { expect, sinon } from './setup';
import { createReducer } from '../src/reducers';

describe('Reducers', () => {

    describe('createReducer', () => {

        it('should return given state without any configuration', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let action = { type: 'some', payload: { value: 10 } };

            let newState = createReducer(initialState, {})(state, action);
            expect(newState).to.equal(state);
        });

        it('should process only specified type as function', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let expectedState = { value: 12 };
            let action = { type: 'add', payload: { value: 10 } };

            let newState = createReducer(initialState, {
                add: (s, d) => {
                    return { value: s.value + d.value };
                }
            })(state, action);
            expect(newState).to.deep.equal(expectedState);
        });

        it('should process only specified type as object for status pending', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let expectedState = { value: 12 };
            let action = { type: 'add', payload: { value: 10 }, meta: { status: 'pending' } };

            let newState = createReducer(initialState, {
                add: {
                    pending: (s, d) => {
                        return { value: s.value + d.value }
                    }
                }
            })(state, action);
            expect(newState).to.deep.equal(expectedState);
        });

        it('should process only specified type as object for status fulfilled', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let expectedState = { value: 12 };
            let action = { type: 'add', payload: { value: 10 }, meta: { status: 'fulfilled' } };

            let newState = createReducer(initialState, {
                add: {
                    fulfilled: (s, d) => {
                        return { value: s.value + d.value }
                    }
                }
            })(state, action);
            expect(newState).to.deep.equal(expectedState);
        });

        it('should process only specified type as object for status rejected', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let expectedState = { value: 2 };
            let action = { type: 'add', error: new Error(), meta: { status: 'rejected' } };

            let newState = createReducer(initialState, {
                add: {
                    rejected: (s, d) => {
                        expect(d).to.equal(action.error);
                        return { value: s.value  }
                    }
                }
            })(state, action);
            expect(newState).to.deep.equal(expectedState);
        });

        it('should process only specified type as object even with unknown status', () => {
            let initialState = { value: 0 };
            let state = { value: 2 };
            let expectedState = { value: 2 };
            let action = { type: 'add', payload: { value: 10 } };

            let newState = createReducer(initialState, {
                add: {
                    fulfilled: (s, d) => {
                        return { value: s.value + d.value }
                    }
                }
            })(state, action);
            expect(newState).to.deep.equal(expectedState);
        });

    });

});
