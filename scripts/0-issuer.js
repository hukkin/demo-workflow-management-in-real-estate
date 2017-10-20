const Common = require("./common.js");
const web3 = Common.web3;

// Create real estate owners
for (let i = 0; i < Common.accounts.owners.length; i++) {
    Common.market.createOwner(Common.accounts.owners[i].id, Common.accounts.owners[i].pubKey, {from: Common.accounts.issuer});
}

// Create agents
for (let i = 0; i < Common.accounts.agents.length; i++) {
    Common.market.createAgent(Common.accounts.agents[i].id, Common.accounts.agents[i].pubKey, {from: Common.accounts.issuer});
}

// Create real estates and assign their first owner
for (let i = 0; i < Common.realEstates.length; i++) {
	// Creating multiple transactions in a short period of time seens to cause
	// issues in TestRPC. Let's add a short interval before creating the next
	// transaction for this reason.
    setTimeout(function(){
        Common.market.createRealEstate(Common.realEstates[i].id, Common.realEstates[i].owner.id, {from: Common.accounts.issuer});
    }, i*5000);
}