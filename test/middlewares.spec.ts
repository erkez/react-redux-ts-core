'use strict';

import Promise = require('bluebird');
import { expect, sinon } from './setup';
import * as middlewares from '../src/middlewares';

describe('Middlewares', () => {

    describe('Promise', () => {

        it('should skip non-async actions', () => {
            let action = { type: 'type', payload: 1 };
            let dispatch = sinon.spy();
            middlewares.promise()(dispatch)(action);
            expect(dispatch).to.have.been.calledWithExactly(action);
        });

        beforeEach('create action and partial expectation', () => {
            let type = 'something';

            this.action = {
                type,
                payload: null
            };

            this.expectation = {
                type,
                payload: null,
                meta: {}
            };

            this.dispatch = sinon.spy();
        });

        it('should process fulfilled promise', () => {
            this.action.payload = {
                data: 1,
                promise: Promise.resolve(2)
            };

            this.expectation.payload = 1;
            this.expectation.meta.status = 'pending';
            middlewares.promise()(this.dispatch)(this.action);
            expect(this.dispatch).to.have.been.calledWithExactly(this.expectation);

            return this.action.payload.promise.then((result: any) => {
                this.expectation.payload = result;
                this.expectation.meta.status = 'fulfilled';
                expect(this.dispatch).to.have.been.calledWithExactly(this.expectation);
            });
        });

        it('should process rejected promise', () => {
            let error = new Error('some message');
            this.action.payload = {
                data: 1,
                promise: Promise.reject(error)
            };

            this.expectation.payload = 1;
            this.expectation.meta.status = 'pending';
            middlewares.promise()(this.dispatch)(this.action);
            expect(this.dispatch).to.have.been.calledWithExactly(this.expectation);

            return this.action.payload.promise.catch((error: any) => {
                delete this.expectation.payload;
                this.expectation.error = error;
                this.expectation.meta.status = 'rejected';

                // Necessary due to this catch being called before middleware's
                setTimeout(() => {
                    expect(this.dispatch).to.have.been.calledWithExactly(this.expectation);
                }, 0);
            });
        });

    });

});
