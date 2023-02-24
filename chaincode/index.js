'use strict';

const balanceTransfer = require('./lib/educationRecord');

module.exports.BalanceTransfer = balanceTransfer;
module.exports.contracts = [balanceTransfer];