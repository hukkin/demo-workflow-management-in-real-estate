## A guide to demoing the contract

### Run a deterministic TestRPC session

```shell
testrpc -d
```

### Deploy the contract

```shell
truffle migrate
```

### Open the status view in browser

Open `scripts/status/index.html` in browser.

### Run the issuer script that creates real estates, owners and agents in the contract.

```shell
cd scripts/
node 0-issuer
```

### Initiate the sale of a real estate

```shell
node 1-initiateSale
```

### Open IPFS web user interface

```shell
ipfs daemon
```
Open `http://localhost:5001/webui` in browser.

### Upload three documents related to the real estate

Upload the document to IPFS by drag-and-drop in the web UI. See what the hash of the document is and announce it in the smart contract.

```shell
node 2-uploadDocument <document hash>
```

### Upload confirmation letter

Upload the document to IPFS by drag-and-drop in the web UI. See what the hash of the document is and announce it in the smart contract.

```shell
node 3-uploadConfirmationLetter <document hash>
```

### Create offers to sell the property as a real estate agent/broker

```shell
node 4-makeAgentOffer <fee>
```

### As the owner of the real estate, accept one of the agent offers

```shell
node 5-chooseAgentOffer <offer id>
```







