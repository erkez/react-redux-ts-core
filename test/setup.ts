'use strict';

import chai = require('chai');
import chaiAsPromised = require('chai-as-promised');
export import sinon = require('sinon');
import sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(sinonChai);

export const expect = chai.expect;
