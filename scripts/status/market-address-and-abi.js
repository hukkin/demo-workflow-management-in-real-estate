const marketAddress = "0xcfeb869f69431e42cdb54a4f4f105c19c080a601";
const marketAbi = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "offerId",
          "type": "uint256"
        },
        {
          "name": "realEstateId",
          "type": "uint256"
        }
      ],
      "name": "chooseAgentOffer",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "realEstateId",
          "type": "uint256"
        }
      ],
      "name": "getTransactionState",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "hash",
          "type": "string"
        }
      ],
      "name": "uploadConfirmationLetter",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "docHash",
          "type": "string"
        }
      ],
      "name": "uploadDocument",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "pubKey",
          "type": "address"
        }
      ],
      "name": "createAgent",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "name": "index",
          "type": "uint8"
        }
      ],
      "name": "getDocumentHash",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "initTransaction",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "owner",
          "type": "uint256"
        }
      ],
      "name": "createRealEstate",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "name": "offerId",
          "type": "uint256"
        }
      ],
      "name": "getOfferFee",
      "outputs": [
        {
          "name": "",
          "type": "uint16"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "pubKey",
          "type": "address"
        }
      ],
      "name": "createOwner",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "offerId",
          "type": "uint256"
        },
        {
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "name": "agentId",
          "type": "uint256"
        },
        {
          "name": "fee",
          "type": "uint16"
        }
      ],
      "name": "makeAgentOffer",
      "outputs": [],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "ownerId",
          "type": "uint256"
        }
      ],
      "name": "LogCreateRealEstate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "ownerId",
          "type": "uint256"
        }
      ],
      "name": "LogInitTransaction",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "document1",
          "type": "string"
        }
      ],
      "name": "LogOneDocumentUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "document2",
          "type": "string"
        }
      ],
      "name": "LogTwoDocumentsUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "document3",
          "type": "string"
        }
      ],
      "name": "LogAllDocumentsUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "confirmationLetter",
          "type": "string"
        }
      ],
      "name": "LogConfirmationLetterUploaded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "offerId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "agentId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "fee",
          "type": "uint16"
        }
      ],
      "name": "LogAgentOffer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "realEstateId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "offerId",
          "type": "uint256"
        }
      ],
      "name": "LogAgentOfferChosen",
      "type": "event"
    }
  ];