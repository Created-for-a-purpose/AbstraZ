const { ethers } = require("ethers");
const { AxelarQueryAPI, Environment, CHAINS } = require("@axelar-network/axelarjs-sdk");
require('dotenv').config({ path: '../.env' });

const daoOnMumbai = "0x7b4c3B11a3FB1BF1372beBbd4a61EF6A115F3517";
const daoOnZkevm = "0x25ABE8832911c81a4415087d6d27ebd5B7975921";
const abi = require('../artifacts/contracts/CrosschainDAO.sol/CrosschainDAO.json').abi;

const getGasFee = (source, dest) => {
    const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
    return api.estimateGasFee(
        CHAINS.TESTNET[source.name.toUpperCase()],
        CHAINS.TESTNET[dest.name.toUpperCase()],
        source.symbol,
    )
}

async function main() {
    const dao_details = {
        name: "A f*cking dao",
        minInvestment: "3",
        zkkyc: "zk",
        treasuryAddress: daoOnMumbai
    }
    const providerm = new ethers.JsonRpcProvider("https://indulgent-shy-aura.matic-testnet.discover.quiknode.pro/f3eadc815d04049d61d581cc6e1f6a6f152c7eec")
    const walletm = new ethers.Wallet(process.env.PRIVATE_KEY, providerm);
    const mdao = new ethers.Contract(daoOnMumbai, abi, walletm)
    console.log('Setting dao on destination chain...')
    const fee = await getGasFee({ name: 'Polygon', symbol: 'matic' }, { name: 'polygonzkevm' })
    console.log('Gas fee: ', fee)
    await mdao.createCrosschainDao('polygon-zkevm', daoOnZkevm, dao_details, { value: fee })
    console.log('Crosschain message sent')

    //Wait
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const providerz = new ethers.JsonRpcProvider("https://rpc.public.zkevm-test.net")
    const walletz = new ethers.Wallet(process.env.PRIVATE_KEY, providerz);
    const zdao = new ethers.Contract(daoOnZkevm, abi, walletz)
    console.log('Checking destination chain...')
    while(await zdao.getDaos() == []) sleep(1000)
    const daos = await zdao.getDaos()
    console.log('Daos on destination: ', daos)
}

main()