'use strict';

import Promise = require('bluebird');
import { expect } from './setup';
import { createAction, createAsyncAction } from '../src/actions';

describe('Actions', () => {

    it('should create basic action', () => {
        let type = 'myType';
        let creator = createAction<number, number>(type, x => x + 1);
        expect(creator(1)).to.deep.equal({
            type,
            payload: 2
        });
    });

    it('should create basic async action', () => {
        let type = 'myType';
        let creator = createAsyncAction<number, number>(type, x => Promise.resolve(x + 1));

        let action = creator(1);
        expect(action).to.have.deep.property('type', type);
        expect(action).to.have.deep.property('payload.data', 1);
        expect(action).to.have.deep.property('payload.promise');

        return expect(action.payload.promise).to.eventually.equal(2);
    });

});
