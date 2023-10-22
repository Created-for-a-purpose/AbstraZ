const { ethers } = require("ethers");
const { AxelarQueryAPI, Environment, CHAINS } = require("@axelar-network/axelarjs-sdk");
require('dotenv').config({ path: '../../.env' });

const daoOnMumbai = "0x050DFdE59f285018c8e036FB07d376a2C6513DCE";
const daoOnZkevm = "0x95aB10B04B7907DC4532265291c274E4aB8705d1";
const abi = require('../../artifacts/contracts/dao/CrosschainDAO.sol/CrosschainDAO.json').abi;

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
        name: "Crypto funds",
        minInvestment: "0.1 MATIC",
        zkkyc: "min-age:18",
        treasuryAddress: "0x1812E463F93F961ED3df8330bB1D90382049c0aF"
    }
    const proposal = {
       name: "Fund Rebalance",
        description: "Change MATIC composition",
        votingEnd: 1697983556,
    }
    const providerm = new ethers.JsonRpcProvider("https://indulgent-shy-aura.matic-testnet.discover.quiknode.pro/f3eadc815d04049d61d581cc6e1f6a6f152c7eec")
    const walletm = new ethers.Wallet(process.env.PRIVATE_KEY, providerm);
    const mdao = new ethers.Contract(daoOnMumbai, abi, walletm)

    // const daoId = await mdao._deterministicDaoId(dao_details)
    // console.log('daoId', daoId)
    // const tx = await mdao.createProposal(proposal, daoId, {gasLimit: 1000000})
    // await tx.wait()
    // const proposalid = await _deterministicProposalId(proposal, daoId)
    // console.log('pid', proposalid)
    // const did = 10189016235025851004753843771549913364404699091215848597274048150744481248429n
    // return
    /// cjghfuhagh
    console.log('Setting dao on destination chain...')
    const fee = await getGasFee({ name: 'Polygon', symbol: 'matic' }, { name: 'polygonzkevm' })
    console.log('Gas fee: ', fee)
    await mdao.createCrosschainDao('polygon-zkevm', daoOnZkevm, dao_details, { value: fee, gasLimit: 1000000})
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