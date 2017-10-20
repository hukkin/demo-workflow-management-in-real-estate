const Common = require("./common.js");
const market = Common.market;

market.initTransaction(Common.selectedRealEstate.id, {from: Common.selectedRealEstate.owner.pubKey, gas: 300000});