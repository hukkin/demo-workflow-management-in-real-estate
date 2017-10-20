pragma solidity ^0.4.8;

contract RealEstateMarket {

    enum TransactionState { NotCreated, WaitingForDocuments,
        WaitingForConfirmationLetter, AcceptingAgentOffers, OnSale, Completed }

    struct Owner {
        address pubKey;
    }

    struct Agent {
        address pubKey;
    }

    struct AgentOffer {
        uint16 fee;
        uint agentId;
    }

    struct Transaction {
        string doc1;
        string doc2;
        string doc3;
        string confirmationLetter;
        TransactionState state;
        mapping (uint => AgentOffer) agentOffers;
        uint chosenAgentOffer;
    }

    struct RealEstate {
        Transaction transaction;
        uint owner;
    }

    modifier transactionInState(uint id, TransactionState state) {
        if (realEstates[id].transaction.state != state) {
            throw;
        }
        _;
    }

    modifier noOngoingTransaction(uint id) {
        if (!(realEstates[id].transaction.state == TransactionState.NotCreated
            || realEstates[id].transaction.state == TransactionState.Completed))
        {
            throw;
        }
        _;
    }

    modifier isOwner(uint id) {
        if (owners[realEstates[id].owner].pubKey != msg.sender) {
            throw;
        }
        _;
    }

    modifier isAgent(uint id) {
        if (agents[id].pubKey != msg.sender) {
            throw;
        }
        _;
    }

    modifier issuerOnly() {
        if (issuer != msg.sender) {
            throw;
        }
        _;
    }

    modifier offerExists(uint offerId, uint realEstateId) {
        if (realEstates[realEstateId].transaction.agentOffers[offerId].agentId == 0) {
            throw;
        }
        _;
    }

    // Mapping from real estate id to real estate object
    mapping (uint => RealEstate) realEstates;
    // Mapping from owner ID to owner object
    mapping (uint => Owner) owners;
    // Mapping from agent ID to agent object
    mapping (uint => Agent) agents;

    address issuer;

    event LogCreateRealEstate(uint realEstateId, uint ownerId);
    event LogInitTransaction(uint realEstateId, uint ownerId);
    event LogOneDocumentUploaded(uint realEstateId, string document1);
    event LogTwoDocumentsUploaded(uint realEstateId, string document2);
    event LogAllDocumentsUploaded(uint realEstateId, string document3);
    event LogConfirmationLetterUploaded(uint realEstateId, string confirmationLetter);
    event LogAgentOffer(uint realEstateId, uint offerId, uint agentId, uint16 fee);
    event LogAgentOfferChosen(uint realEstateId, uint offerId);

    function RealEstateMarket() {
        issuer = msg.sender;
    }

    function createOwner(uint id, address pubKey)
        issuerOnly()
    {
        owners[id].pubKey = pubKey;
    }

    function createRealEstate(uint id, uint owner)
        issuerOnly()
    {
        realEstates[id].owner = owner;
        LogCreateRealEstate(id, owner);
    }

    function createAgent(uint id, address pubKey)
        issuerOnly()
    {
        agents[id].pubKey = pubKey;
    }

    function initTransaction(uint id)
        isOwner(id)
        noOngoingTransaction(id)
    {
        realEstates[id].transaction.state = TransactionState.WaitingForDocuments;
        LogInitTransaction(id, realEstates[id].owner);
    }

    function uploadDocument(uint id, string docHash)
        transactionInState(id, TransactionState.WaitingForDocuments)
    {
        if (bytes(realEstates[id].transaction.doc1).length == 0) {
            realEstates[id].transaction.doc1 = docHash;
            LogOneDocumentUploaded(id, docHash);
        }
        else if (bytes(realEstates[id].transaction.doc2).length == 0) {
            realEstates[id].transaction.doc2 = docHash;
            LogTwoDocumentsUploaded(id, docHash);
        }
        else if (bytes(realEstates[id].transaction.doc3).length == 0) {
            realEstates[id].transaction.doc3 = docHash;
            nextTransactionState(id);
            LogAllDocumentsUploaded(id, docHash);
        }
    }

    function uploadConfirmationLetter(uint id, string hash)
        transactionInState(id, TransactionState.WaitingForConfirmationLetter)
    {
        realEstates[id].transaction.confirmationLetter = hash;
        nextTransactionState(id);
        LogConfirmationLetterUploaded(id, hash);
    }

    function makeAgentOffer(uint offerId, uint realEstateId, uint agentId, uint16 fee)
        transactionInState(realEstateId, TransactionState.AcceptingAgentOffers)
        isAgent(agentId)
    {
        realEstates[realEstateId].transaction.agentOffers[offerId].fee = fee;
        realEstates[realEstateId].transaction.agentOffers[offerId].agentId = agentId;
        LogAgentOffer(realEstateId, offerId, agentId, fee);
    }

    function chooseAgentOffer(uint offerId, uint realEstateId)
        transactionInState(realEstateId, TransactionState.AcceptingAgentOffers)
        isOwner(realEstateId)
        offerExists(offerId, realEstateId)
    {
        realEstates[realEstateId].transaction.chosenAgentOffer = offerId;
        nextTransactionState(realEstateId);
        LogAgentOfferChosen(realEstateId, offerId);
    }

    function nextTransactionState(uint realEstateId) private {
        uint currentState = uint(realEstates[realEstateId].transaction.state);
        realEstates[realEstateId].transaction.state = TransactionState(currentState + 1);
    }




    function getTransactionState(uint realEstateId) constant returns (TransactionState) {
        return realEstates[realEstateId].transaction.state;
    }

    function getOfferFee(uint realEstateId, uint offerId) constant returns (uint16) {
        return realEstates[realEstateId].transaction.agentOffers[offerId].fee;
    }

    function getDocumentHash(uint realEstateId, uint8 index) constant returns (string) {
        if (index == 1) {
            return realEstates[realEstateId].transaction.doc1;
        }
        else if (index == 2) {
            return realEstates[realEstateId].transaction.doc2;
        }
        else if (index == 3) {
            return realEstates[realEstateId].transaction.doc3;
        }
        throw;
    }
}
