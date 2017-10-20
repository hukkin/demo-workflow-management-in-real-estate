const RealEstateMarket = artifacts.require("./RealEstateMarket.sol");


contract('Smoke test - RealEstateMarket', function(accounts) {
  let market;
  const issuer = accounts[0];
  const states = {"waitingForDocuments": 1,
                  "waitingForConfirmationLetter": 2,
                  "acceptingAgentOffers": 3,
                  "onSale": 4};
  const doc1Hash = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";
  const doc2Hash = "QmSoLju6m7xTh3DuokvT3886QRYqxAzb1kShaanJgW36yx";
  const doc3Hash = "QmWHyrPWQnsz1wxHR219ooJDYTvxJPyZuDUPSDpdsAovN5";
  const confirmationLetterHash = "QmdXzZ25cyzSF99csCQmmPZ1NTbWTe8qtKFaZKpZQPdTFB";

  const owners = [{"id": 1415, "pubKey": accounts[0]},
                  {"id": 1812, "pubKey": accounts[1]},
                  {"id": 1933, "pubKey": accounts[2]},
                  {"id": 2163, "pubKey": accounts[3]},
                  {"id": 6344, "pubKey": accounts[4]},
                  {"id": 8764, "pubKey": accounts[5]}];

  const agents = [{"id": 6321, "pubKey": accounts[6]},
                  {"id": 5642, "pubKey": accounts[7]},
                  {"id": 6663, "pubKey": accounts[8]}];

  const realEstates = [{"id": 1415, "owner": owners[0]},
                        {"id": 6344, "owner": owners[1]},
                        {"id": 8764, "owner": owners[2]}];

  const agentOffers = [{"id": 1298, "realEstateId": realEstates[0].id, "fee": 11},
                        {"id": 3467, "realEstateId": realEstates[0].id, "fee": 15}];

  before(function() {
    return RealEstateMarket.deployed().then(function(instance) {
      market = instance;
      market.createOwner(owners[0].id, owners[0].pubKey, {from: issuer});
      market.createOwner(owners[1].id, owners[1].pubKey, {from: issuer});
      market.createOwner(owners[2].id, owners[2].pubKey, {from: issuer});
      market.createOwner(owners[3].id, owners[3].pubKey, {from: issuer});
      market.createOwner(owners[4].id, owners[4].pubKey, {from: issuer});
      market.createOwner(owners[5].id, owners[5].pubKey, {from: issuer});
      market.createAgent(agents[0].id, agents[0].pubKey, {from: issuer});
      market.createAgent(agents[1].id, agents[1].pubKey, {from: issuer});
      market.createAgent(agents[2].id, agents[2].pubKey, {from: issuer});
      market.createRealEstate(realEstates[0].id, realEstates[0].owner.id, {from: issuer});
      market.createRealEstate(realEstates[1].id, realEstates[1].owner.id, {from: issuer});
      market.createRealEstate(realEstates[2].id, realEstates[2].owner.id, {from: issuer});
    });
  });


  it("should initialize a transaction", function() {
    return market.initTransaction(realEstates[0].id, {from: realEstates[0].owner.pubKey}).then(function() {
      return market.getTransactionState(realEstates[0].id);
    }).then(function(actualState) {
      assert.equal(actualState, states.waitingForDocuments, "Wrong transaction state1");
    });
  });

  it("should upload 3 documents", function() {
    return market.uploadDocument(realEstates[0].id, doc1Hash, {from: realEstates[0].owner.pubKey}).then(function() {
      market.uploadDocument(realEstates[0].id, doc2Hash, {from: realEstates[0].owner.pubKey});
    }).then(function() {
      market.uploadDocument(realEstates[0].id, doc3Hash, {from: realEstates[0].owner.pubKey});
    }).then(function() {
      return market.getDocumentHash(realEstates[0].id, 1);
    }).then(function(hash) {
      assert.equal(hash, doc1Hash, "Wrong document hash");
    }).then(function() {
      return market.getTransactionState(realEstates[0].id);
    }).then(function(actualState) {
      assert.equal(actualState, states.waitingForConfirmationLetter, "Wrong transaction state2");
    });
  });

  it("should upload confirmation letter", function() {
    return market.uploadConfirmationLetter(realEstates[0].id, confirmationLetterHash, {from: realEstates[0].owner.pubKey}).then(function() {
      return market.getTransactionState(realEstates[0].id);
    }).then(function(actualState) {
      assert.equal(actualState, states.acceptingAgentOffers, "Wrong transaction state3");
    });
  });

  it("agents should make offers", function() {
    return market.makeAgentOffer(agentOffers[0].id, agentOffers[0].realEstateId, agents[1].id, agentOffers[0].fee, {from: agents[1].pubKey}).then(function() {
      return market.getOfferFee(agentOffers[0].realEstateId, agentOffers[0].id);
    }).then(function(actualFee) {
      assert.equal(actualFee, agentOffers[0].fee, "Wrong fee");
    });
  });

  it("seller should choose one agent offer", function() {
    return market.chooseAgentOffer(agentOffers[0].id, agentOffers[0].realEstateId, {from: realEstates[0].owner.pubKey}).then(function() {
      return market.getTransactionState(realEstates[0].id);
    }).then(function(actualState) {
      assert.equal(actualState, states.onSale, "Wrong transaction state");
    });
  });

});