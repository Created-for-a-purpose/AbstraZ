// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./zkpVerifiers/ZKPVerifier.sol";

contract AgeVerifier is ZKPVerifier {
    mapping(address => uint256) public members;

    constructor(address owner) ZKPVerifier(owner) {}

    function _beforeProofSubmit(
        uint64,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        address add = GenesisUtils.int256ToAddress(inputs[validator.getChallengeInputIndex()]);
        require(_msgSender()==add, "Not the same address");
    }

    function _afterProofSubmit(uint64, uint256[] memory inputs, uint256[] memory publicInput, ICircuitValidator validator)
    internal override {
        require(publicInput.length != 0, "publicInput is empty");
        uint256 daoId = publicInput[0];
        //execute dao action
        _joinDao(_msgSender(), daoId);
    }

    function _joinDao(address joiner, uint256 daoId) internal {
        require(members[joiner] == 0, "Already a member");
        members[joiner] = daoId;
    }

    function isMember(
        address member,
        uint256 daoId
    ) external view returns (bool) {
        return members[member] == daoId;
    }
}
