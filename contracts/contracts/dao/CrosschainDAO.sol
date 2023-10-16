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
        address _gasService
    ) AxelarExecutable(_gateway) {
        gasService = IAxelarGasService(_gasService);
    }

    function createCrosschainDao(
        string calldata destinationChain,
        string calldata destinationAddress,
        dao_details calldata _dao_details
    ) external payable {
        require(msg.value > 0, "Pay gas");
        createDao(_dao_details);
        bytes memory payload = abi.encode(_dao_details);
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
        dao_details memory _dao_details;
        (_dao_details) = abi.decode(payload, (dao_details));
        createDao(_dao_details);
    }
}
