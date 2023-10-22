require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  networks: {
    mantle: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://rpc.testnet.mantle.xyz",
    },
    zkevm: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://rpc.public.zkevm-test.net",
    },
    mumbai: {
      accounts: [process.env.PRIVATE_KEY],
      url: "https://indulgent-shy-aura.matic-testnet.discover.quiknode.pro/f3eadc815d04049d61d581cc6e1f6a6f152c7eec",
    }
  },

  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
        details: {
          yulDetails: {
            optimizerSteps: "u",
          },
        },
      },
    }
  }
};
