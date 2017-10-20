const Common = require("./common.js");
const market = Common.market;

const offerId = parseInt(process.argv[2]);
market.chooseAgentOffer(offerId, Common.selectedRealEstate.id,
    {from: Common.selectedRealEstate.owner.pubKey, gas: 300000});