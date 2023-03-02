export const ContractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'AssetSeized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiverAddress',
        type: 'address',
      },
    ],
    name: 'FlashClaim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'InstantSell',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'ListedOnSeaport',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'orderHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'ListingCancelledSeaport',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'offerSignature',
        type: 'bytes',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'LoanExecuted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'LoanRepaid',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint128',
            name: 'price',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'downPaymentAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'expiration',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Offer',
        name: 'offer',
        type: 'tuple',
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'OfferSignatureUsed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        indexed: false,
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'PaymentMade',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: '_requireAvailableSignature',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: '_requireSignature65',
    outputs: [],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'price',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'downPaymentAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'expiration',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Offer',
        name: 'offer',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'buyWithFinancing',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'calculateMinimumPayment',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minimumPayment',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'periodInterest',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'receiverAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'flashClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
    ],
    name: 'getLoan',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'buyerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sellerNftId',
            type: 'uint256',
          },
          {
            internalType: 'uint128',
            name: 'remainingPrincipal',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodEndTimestamp',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodBeginTimestamp',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Loan',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'price',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'downPaymentAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'expiration',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Offer',
        name: 'offer',
        type: 'tuple',
      },
    ],
    name: 'getOfferHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'getOfferSignatureStatus',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'price',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'downPaymentAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'expiration',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Offer',
        name: 'offer',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'getOfferSigner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newRoyaltiesEngineAddress',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
    ],
    name: 'makePayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pauseSanctions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nftId',
        type: 'uint256',
      },
    ],
    name: 'seizeAsset',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'nftContractAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unpauseSanctions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint128',
            name: 'price',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'downPaymentAmount',
            type: 'uint128',
          },
          {
            internalType: 'uint128',
            name: 'minimumPrincipalPerPeriod',
            type: 'uint128',
          },
          {
            internalType: 'uint256',
            name: 'nftId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'nftContractAddress',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'uint32',
            name: 'periodInterestRateBps',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'periodDuration',
            type: 'uint32',
          },
          {
            internalType: 'uint32',
            name: 'expiration',
            type: 'uint32',
          },
        ],
        internalType: 'struct ISellerFinancingStructs.Offer',
        name: 'offer',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'withdrawOfferSignature',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const
