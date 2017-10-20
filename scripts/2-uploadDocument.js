const Common = require("./common.js");
const market = Common.market;

const documentHash = process.argv[2];
market.uploadDocument(Common.selectedRealEstate.id, documentHash,
	{from: Common.accounts.issuer, gas: 300000});
