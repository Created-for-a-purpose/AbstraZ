# AbstraZ

## Description
AbstraZ is made to explore the space of crosschain investments and crosschain dao governance (dao creation, dao proposal and zk voting). This is powered by wallet abstraction so that even non web3 folks can onboard this platform. When someone wants to create a dao on abstraZ, first a safe multisig wallet will be created which will act like the treasury of this dao so that only multiple dao operator signatures are needed for sending treasury transactions. After this, the dao is created on multiple chains using Axelar's GMP, so that it is available crosschain. Dao participation is powered by verifiable zk proofs, which prove certain conditions set by the dao creator and confidential data is not shared. Successful zk verification allows to join a dao, after that for further dao participation(voting), the user has to verify further SNARK proofs for role upgradation. This allows for crosschain anonymous voting (sticking to the commit-reveal scheme where voter privacy is preserved throughout the voting period).

## Working
We have used Safe's Auth Kit for login with google, other web2 accounts and wallets. Auth kit is the foundation of the whole platform because it is responsible for all interactions (transactions) with blockchains. We have also used the Protocol kit for creation of dao treasury (multisig wallet). This multisig wallet holds all the funds of the dao, and only when the threshold number of dao operators sign a particular transaction, then only the transaction will be executed from the treasury.

Interoperability is achieved using Axelar's GMP for communication with other chains and interchain gas payment. Our CrosschainDAO.sol smart contract is responsible for handling all cross chain communication. When a DAO is created on Mumbai, it is also created on other chains (MANTLE testnet), so that dao contributors can also participate in the DAO from other chains. GMP is also used for implementing anonymous voting. Anyone can vote from zkEVM or Mantle for a proposal that is on Polygon mumbai, which supports the noir's SNARK verifiers. SNARKs are sent from one chain to another using the callContract method for verification. 

zk-SNARK proofs generation and verification is implemented using Noir. These verifications helps us preserve user privacy and allow us to make this platform available to genuine and active users. For X followers SNARK proof generation, the user has to first sign in with twitter and then a SNARK proof is generated for DAO role upgradation, which allows for special access to DAO actions. Now comes the crosschain anonymous voting feature, noir's on-chain verifier smart contracts are used to prove that a user has commited to a valid vote without revealing their actual vote to anyone during the voting period. After the voting period ends, the voter then reveals their vote and pederson commitment secret, through which it is verified that the revealed value is the same as the earlier committed value. After successful verification votes are incremented. Now, noir does not support verifier smart contracts on Polygon-zkevm, so we have used Axelar's GMP so that the voters on polygon zkevm chain can still vote for a proposal on other chain. Their SNARK proof (bytes memory) and other voting details will be encoded as payload and transferred from zkevm to mumbai (the proposal's origin chain), where the Noir verifer smart contract will verify it and increment the vote. 

Chainlink data feeds are used to fetch real time price feeds (MATIC/USD) for representing the treasury's NAV (net asset value).

## More
DAO creation on Mantle from Polygon mumbai-

AxelarScan link: https://testnet.axelarscan.io/gmp/0x3eb2edc4e4c7e2a6e5ad9ab72e5499ee06dcacf6b88512ec94c0cf5ea424dea8:16

DAO creation on polygon zkEVM from mumbai-

AxelarScan link: https://testnet.axelarscan.io/gmp/0xdf76f74f48bf6a6f7ae87dc679fb31f74222df073c50ea8ae5fa68a94247491a:6

### Experiences using Axelar
#### 1. Positive: Awesome interoperability support ! 
Axelar gateway and gas service were available on both zkEVM and Mantle, so this was really great.
#### 2. Negative: Long crosschain transaction approval time (~ 6 mins)
