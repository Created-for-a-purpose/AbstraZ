//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DAOs.sol";
import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract CrosschainDAO is Daos, AxelarExecutable {
    IAxelarGasService public immutable gasService;

    constructor(
        address _gateway,
        address _gasService,
        address _verifier
    ) AxelarExecutable(_gateway) Daos(_verifier) {
        gasService = IAxelarGasService(_gasService);
    }

    function createCrosschainDao(
        string calldata destinationChain,
        string calldata destinationAddress,
        dao_details calldata _dao_details
    ) external payable {
        require(msg.value > 0, "Pay gas");
        createDao(_dao_details);
        bytes memory payload = abi.encode(1, _dao_details);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function castVoteCrosschain(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint256 pid,
        zkVoting calldata _zkVoting
    ) external payable {
        require(msg.value > 0, "Pay gas");
        bytes memory payload = abi.encode(2, _zkVoting, pid);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function revealVoteCrosschain(
        string calldata destinationChain,
        string calldata destinationAddress,
        bytes32 hash,
        uint256 pid,
        uint256 vote
    ) external payable {
        require(msg.value > 0, "Pay gas");
        bytes memory payload = abi.encode(3, hash, pid, vote);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);
    }

    function _execute(
        string calldata,
        string calldata,
        bytes calldata payload
    ) internal override {
        (uint256 execCode, ) = abi.decode(payload, (uint256, dao_details));
        if (execCode == 1) {
            (, dao_details memory _dao_details) = abi.decode(
                payload,
                (uint256, dao_details)
            );
            createDao(_dao_details);
        } else if (execCode == 2) {
            (, zkVoting memory _zkVoting, uint256 pid) = abi.decode(
                payload,
                (uint256, zkVoting, uint256)
            );
            castVote(pid, _zkVoting);
        } else if (execCode == 3) {
            (, bytes32 hash, uint256 pid, uint256 vote) = abi.decode(
                payload,
                (uint256, bytes32, uint256, uint256)
            );
            revealVote(hash, pid, vote);
        } 
    }
}
