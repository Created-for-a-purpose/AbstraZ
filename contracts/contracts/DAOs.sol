//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct dao_details {
    string name;
    string minInvestment;
    string zkkyc;
    address treasuryAddress;
}

contract Daos {
    uint256 totalDaos = 0;
    mapping(uint256 => dao_details) public daos;
    dao_details[] public allDaos;

    function _deterministicDaoId(
        dao_details memory _dao
    ) internal pure returns (uint256) {
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
}
