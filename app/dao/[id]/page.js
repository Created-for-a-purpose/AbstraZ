'use client'
import MemberCard from "@/components/MemberCard/MemberCard";
import styles from "./page.module.css";
import DaoCard2 from "@/components/DaoCard2/DaoCard2";
import ProposalCard from "@/components/ProposalCard/ProposalCard";
import { useAxelar } from "@/hooks/useAxelar";
import { useAuthKit } from "@/hooks/useAuthKit";
import { useState, useEffect } from "react";
import { useChainlinkFeed } from "@/hooks/useChainlinkFeed";
import { useTwitter } from "@/hooks/useTwitter";
import { useNoir } from "@/hooks/useNoir";

export default function DAO({ params }) {
  const { eoa, chain } = useAuthKit();
  const { getAllDaos } = useAxelar();
  const { getEthFeed, getMaticFeed } = useChainlinkFeed();
  const [nav, setNav] = useState(0)
  const [dao, setDao] = useState(null)
  const { followers } = useTwitter()
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (!eoa) return
    getAllDaos().then((res) => {
      if (res.length <= params.id) return
      setDao(res[params.id])
    })
  }, [eoa]);

  useEffect(() => {
    if (!eoa || !dao) return
    async function calcNav() {
      let _nav = 0;
      _nav+= await getEthFeed()
      _nav+= await getMaticFeed()
      setNav(_nav)
    }
    calcNav()
  }, [eoa, dao]);

  const verify = async ()=>{
    if(!followers) return
    const {verifyZkKyc} = await useNoir()
    const input = { x: followers, y: 40}
    const isVerified = await verifyZkKyc(input)
    setVerified(isVerified)
  }

  return (
    <>
      <div className={styles.container}>
        <DaoCard2 Amount={dao?.[1]} NAV={"$"+nav.toFixed(2)} Title={dao?.[0]} TreasuryAddress={dao?.[3]} />
        <MemberCard verified={verified} verify={verify}/>
        <div className={styles.title}>
          Proposals
        </div>
        <ProposalCard chain={chain}/>
      </div>
    </>
  );
}