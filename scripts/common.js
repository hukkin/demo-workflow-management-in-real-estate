const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

exports.marketAddress = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601";

exports.marketAbi = require('../build/contracts/RealEstateMarket.json').abi;
exports.market = web3.eth.contract(exports.marketAbi).at(exports.marketAddress);
exports.web3 = web3;
exports.accounts = {
  "issuer": web3.eth.accounts[0],
  "owners": [{"id": 2457, "pubKey": web3.eth.accounts[1]}, {"id": 7252, "pubKey": web3.eth.accounts[2]}, {"id": 8345, "pubKey": web3.eth.accounts[3]}, {"id": 1361, "pubKey": web3.eth.accounts[4]}, {"id": 4366, "pubKey": web3.eth.accounts[5]}, {"id": 6134, "pubKey": web3.eth.accounts[6]}],
  "agents": [{"id": 6990, "pubKey": web3.eth.accounts[7]}, {"id": 2214, "pubKey": web3.eth.accounts[8]}, {"id": 4868, "pubKey": web3.eth.accounts[9]}]
};
exports.realEstates = [{"id": 2645, "owner": exports.accounts.owners[0]}, {"id": 7727, "owner": exports.accounts.owners[1]}, {"id": 3444, "owner": exports.accounts.owners[2]}];

exports.selectedRealEstate = exports.realEstates[0];
exports.selectedAgent = exports.accounts.agents[0];