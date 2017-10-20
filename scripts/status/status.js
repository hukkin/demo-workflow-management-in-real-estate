if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let transactions = [];
var dynatable = $('#transactions').dynatable().data('dynatable');
market = web3.eth.contract(marketAbi).at(marketAddress);

market.LogCreateRealEstate().watch(function(error, result) {
    if (!error) {
        let newOffer = result.args;
        newOffer.state = "No ongoing transaction"
        console.log(newOffer);
        transactions.push(newOffer);
        updateDynatable(dynatable, transactions);
    } else {console.log("error");}
});

market.LogInitTransaction().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].state = "1/4 Waiting for documents";
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogOneDocumentUploaded().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].documentOne = makeIpfsLink(newOffer.document1);
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogTwoDocumentsUploaded().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].documentTwo = makeIpfsLink(newOffer.document2);
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogAllDocumentsUploaded().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].documentThree = makeIpfsLink(newOffer.document3);
            transactions[i].state = "2/4 Waiting for confirmation letter";
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogConfirmationLetterUploaded().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].confirmationLetter = makeIpfsLink(newOffer.confirmationLetter);
            transactions[i].state = "3/4 Waiting for agent offers";
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogAgentOffer().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            if (typeof transactions[i].agentOffers === 'undefined') {
                transactions[i].agentOffers = "";
            }
            transactions[i].agentOffers = transactions[i].agentOffers + JSON.stringify({"Offer Id": newOffer.offerId, "Agent Id": newOffer.agentId, "Fee": newOffer.fee});
            updateDynatable(dynatable, transactions);
        }
    }
});

market.LogAgentOfferChosen().watch(function(error, result) {
    if (!error){
        let newOffer = result.args;
        let i = transactions.findIndex((obj => obj.realEstateId.equals(newOffer.realEstateId)));
        if (i !== -1) {
            transactions[i].chosenOffer = newOffer.offerId;
            transactions[i].state = "4/4 On sale";
            updateDynatable(dynatable, transactions);
        }
    }
});

function updateDynatable(table, content) {
    table.settings.dataset.originalRecords = content;
    table.process();
}

function makeIpfsLink(hash) {
    const visibleText = hash;
    return '<a href="https://ipfs.io/ipfs/' + hash + '">' + visibleText + '</a>';
}