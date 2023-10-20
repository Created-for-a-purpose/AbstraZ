// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumer {

    AggregatorV3Interface internal ethPriceFeed;
    AggregatorV3Interface internal maticPriceFeed;

    constructor() {
        // mumbai addresses
        ethPriceFeed = AggregatorV3Interface(
            0x0715A7794a1dc8e42615F059dD6e406A6594651A
        );
        maticPriceFeed = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );
    }

    function getEtherDataFeedLatest() public view returns (int) {
        (, int answer, , , ) = ethPriceFeed.latestRoundData();
        return answer;
    }

    function getMaticDataFeedLatest() public view returns (int) {
        (, int answer, , , ) = maticPriceFeed.latestRoundData();
        return answer;
    }
}
