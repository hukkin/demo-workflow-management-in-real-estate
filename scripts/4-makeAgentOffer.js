const Common = require("./common.js");
const market = Common.market;

const offerId = getRandomInt(1000, 10000);
const fee = parseInt(process.argv[2]);
market.makeAgentOffer(offerId, Common.selectedRealEstate.id, Common.selectedAgent.id, fee,
    {from: Common.selectedAgent.pubKey, gas: 300000});

/* A random integer between the specified values. The value is no lower than min
 * (or the next integer greater than min if min isn't an integer), and is less
 * than (but not equal to) max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}