//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {VoteVerifier} from "../noirVerifiers/plonk_vote.sol";

struct dao_details {
    string name;
    string minInvestment;
    string zkkyc;
    address treasuryAddress;
}

struct proposal {
    string name;
    string description;
    uint256 votingEnd;
}

struct zkVoting{
    bytes zkProof;
    bytes32[] publicInputs;
    bytes32 nullifierHash;
    bytes32 voteCommitment;
}

contract Daos {
    uint256 totalDaos = 0;
    dao_details[] public allDaos;
    mapping(uint256 => dao_details) public daos;
    mapping(uint256 => proposal) public proposals;
    mapping(uint256 => uint256[2]) public proposalVotes;
    mapping(uint256=>uint256[]) public proposalsByDao;

    mapping(address=>bytes32) public nullifiers;
    mapping(address=>bytes32) public commitment;
    mapping(bytes32 => bool) public hasVoted;  

    VoteVerifier public verifier;

    constructor(address _verifier) {
        verifier =  VoteVerifier(_verifier);
    }

    function _deterministicDaoId(
        dao_details memory _dao
    ) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(_dao)));
    }

    function createDao(dao_details memory _dao) internal {
        uint256 daoId = _deterministicDaoId(_dao);
        daos[daoId] = _dao;
        allDaos.push(_dao);
        totalDaos++;
    }

    function getDaos() external view returns (dao_details[] memory) {
        return allDaos;
    }

    function _deterministicProposalId(
        proposal memory _proposal,
        uint256 daoId
    ) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(_proposal, daoId)));
    }

    function createProposal(
        proposal memory _proposal,
        uint256 daoId
    ) internal {
        uint256 proposalId = _deterministicProposalId(_proposal, daoId);
        proposals[proposalId] = _proposal;
        proposalsByDao[daoId].push(proposalId);
    }

    function castVote(uint256 proposalId, zkVoting memory _zkVoting) internal {
        bytes32 nullifierHash = _zkVoting.nullifierHash;
        require(!hasVoted[nullifierHash], "Vote already cast");
        require(verifier.verify(_zkVoting.zkProof, _zkVoting.publicInputs), "Invalid vote");
        hasVoted[nullifierHash] = true;
        nullifiers[msg.sender] = nullifierHash;
        commitment[msg.sender] = _zkVoting.voteCommitment;
        require(block.timestamp < proposals[proposalId].votingEnd, "Voting period over");
    }

    function revealVote(bytes32 nullifier, uint256 proposalId, uint256 vote) internal {
        require(nullifiers[msg.sender] == nullifier, "You are not the voter");
        require(hasVoted[nullifier], "Vote not cast");
        require(vote == 0 || vote == 1, "Invalid vote");
        proposalVotes[proposalId][vote]++;
    }

    function getVotingResult(uint256 proposalId) external view returns (bool){
        uint256[2] memory votes = proposalVotes[proposalId];
        return votes[1] > votes[0];
    }

    function getProposals(uint256 daoId) external view returns (proposal[] memory) {
        uint256[] memory proposalIds = proposalsByDao[daoId];
        proposal[] memory _proposals = new proposal[](proposalIds.length);
        for (uint256 i = 0; i < proposalIds.length; i++) {
            _proposals[i] = proposals[proposalIds[i]];
        }
        return _proposals;
    }

    function getProposalVotes(uint256 proposalId) external view returns (uint256[2] memory) {
        return proposalVotes[proposalId];
    }
}
