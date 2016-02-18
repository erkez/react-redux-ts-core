import {PromiseReducers} from "../src/reducers";
'use strict';

import Promise = require('bluebird');
import { expect, sinon } from './setup';
import { asyncActionReducer } from '../src/reducers';

describe('Reducers', () => {

    interface State {
        value: number;
    }

    beforeEach('setup reducers', () => {
        this.reducers = {
            fulfilled: sinon.stub().returnsArg(1),
            rejected: sinon.stub().returnsArg(1),
            pending: sinon.stub().returnsArg(1)
        } as PromiseReducers<number, number, State>;
    });

    it('should use default state', () => {
        let defaultState = { value: 1 };
        let action = { type: 'other' };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        let newState = reducer(undefined, action);

        expect(newState).to.deep.equal(defaultState);
        expect(this.reducers.fulfilled).to.have.callCount(0);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(0);
    });

    it('should skip different type', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let action = { type: 'other' };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(state);
        expect(this.reducers.fulfilled).to.have.callCount(0);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(0);
    });

    it('should not skip with type argument `null`', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let payload = { value: 3 };
        let action = { type: 'other', payload, meta: { status: 'fulfilled' } };

        let reducer = asyncActionReducer(null, defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(payload);
        expect(this.reducers.fulfilled).to.have.callCount(1);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(0);
    });

    it('should skip with type argument `null` and no meta.status', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let payload = { value: 3 };
        let action = { type: 'other', payload };

        let reducer = asyncActionReducer(null, defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(state);
        expect(this.reducers.fulfilled).to.have.callCount(0);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(0);
    });

    it('should call fulfilled reducer', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let payload = { value: 3 };
        let action = { type: 'some', payload, meta: { status: 'fulfilled' } };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(payload);
        expect(this.reducers.fulfilled).to.have.callCount(1);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(0);

        expect(this.reducers.fulfilled).to.have.been.calledWith(state, payload);
        expect(this.reducers.fulfilled).to.have.returned(payload);
    });

    it('should call rejected reducer', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let error = new Error('123');
        let action = { type: 'some', error, meta: { status: 'rejected' } };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(error);
        expect(this.reducers.fulfilled).to.have.callCount(0);
        expect(this.reducers.rejected).to.have.callCount(1);
        expect(this.reducers.pending).to.have.callCount(0);

        expect(this.reducers.rejected).to.have.been.calledWith(state, error);
        expect(this.reducers.rejected).to.have.returned(error);
    });

    it('should call pending reducer', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let payload = { value: 10 };
        let action = { type: 'some', payload, meta: { status: 'pending' } };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        let newState = reducer(state, action);

        expect(newState).to.deep.equal(payload);
        expect(this.reducers.fulfilled).to.have.callCount(0);
        expect(this.reducers.rejected).to.have.callCount(0);
        expect(this.reducers.pending).to.have.callCount(1);

        expect(this.reducers.pending).to.have.been.calledWith(state, payload);
        expect(this.reducers.pending).to.have.returned(payload);
    });

    it('should throw if type is not proper async', () => {
        let defaultState = { value: 1 };
        let state = { value: 2 };
        let action = { type: 'some', payload: { value: 10 } };

        let reducer = asyncActionReducer('some', defaultState, this.reducers);
        expect(() => reducer(state, action)).to.throw(Error);
    });

});
