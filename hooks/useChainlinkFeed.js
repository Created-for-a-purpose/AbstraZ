import { useAuthKit } from "./useAuthKit"
import { ethers } from "ethers"
import { chains } from "@/utils/chains"
import dataFeedAbi from "@/contracts/artifacts/contracts/dao/DataConsumer.sol/DataConsumer.json";

export const useChainlinkFeed = () => {
    const { provider, chain } = useAuthKit()

    const getDataFeedContract = async () => {
        const contract = new ethers.Contract(
            chains[chain].DataConsumer,
            dataFeedAbi.abi,
            await provider.getSigner()
        )
        return contract
    }
    const getEthFeed = async () => {
        const dataFeedContract = await getDataFeedContract()
        const feed = await dataFeedContract.getEtherDataFeedLatest()
        return feed.toString()/10**8
    }
    const getMaticFeed = async () => {
        const dataFeedContract = await getDataFeedContract()
        const feed = await dataFeedContract.getMaticDataFeedLatest()
        return feed.toString()/10**8
    }
    return { getEthFeed, getMaticFeed }
}