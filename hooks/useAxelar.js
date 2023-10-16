import { AxelarQueryAPI, Environment, CHAINS } from "@axelar-network/axelarjs-sdk";
import { useAuthKit } from "./useAuthKit";
import { chains } from "@/utils/chains";
import { ethers } from "ethers";
import crosschainAbi from "@/contracts/artifacts/contracts/dao/CrosschainDAO.sol/CrosschainDAO.json";

export const useAxelar = () => {
    const { provider, chain } = useAuthKit();

    const getCrosschainDaoContract = async () => {
       const contract = new ethers.Contract(
            chains[chain].CrosschainDao,
            crosschainAbi.abi,
            await provider.getSigner()
        )
        return contract;
    }

    const createDao = async (name, minInvestment, zkkyc, treasuryAddress) => {
        const destChains = [chains.mantle, chains.mumbai, chains.polygonZkEvm]
        for (const destChain of destChains) {
            const destinationChain = destChain.name;
            const destinationAddress = destChain.CrosschainDao;
            if (destinationChain == chains[chain].name) continue;
            await createCrosschainDao(destinationChain, destinationAddress, {
                name,
                minInvestment,
                zkkyc,
                treasuryAddress
            });
        }
    }

    const quoteGasFee = (source, dest) => {
        const api = new AxelarQueryAPI({ environment: Environment.TESTNET });
        return api.estimateGasFee(
            CHAINS.TESTNET[source.name.toUpperCase()],
            CHAINS.TESTNET[dest.name.toUpperCase()],
            source.symbol,
        )
    }

    async function createCrosschainDao(destinationChain, destinationAddress, daoDetails) {
        const gasFee = await quoteGasFee({
            name: chains[chain].name,
            symbol: chains[chain].symbol
        }, { name: destinationChain });
        const crosschainDaoContract = await getCrosschainDaoContract();
        await crosschainDaoContract.createCrosschainDao(
            destinationChain,
            destinationAddress,
            daoDetails,
            { value: gasFee }
        )
    }

    const getAllDaos = async () => {
       const crosschainDaoContract = await getCrosschainDaoContract();
       const daos = await crosschainDaoContract.getDaos();
       return daos;
    }

    return { createDao, getAllDaos }
}