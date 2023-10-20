'use client'
import MemberCard from "@/components/MemberCard/MemberCard";
import styles from "./page.module.css";
import DaoCard2 from "@/components/DaoCard2/DaoCard2";
import ProposalCard from "@/components/ProposalCard/ProposalCard";
import { useAxelar } from "@/hooks/useAxelar";
import { useAuthKit } from "@/hooks/useAuthKit";
import { useState, useEffect } from "react";
import { useChainlinkFeed } from "@/hooks/useChainlinkFeed";

export default function DAO({ params }) {
  const { eoa } = useAuthKit();
  const { getAllDaos } = useAxelar();
  const { getEthFeed, getMaticFeed } = useChainlinkFeed();
  const [nav, setNav] = useState(0)
  const [dao, setDao] = useState(null)

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

  return (
    <>
      <div className={styles.container}>
        <DaoCard2 Amount={dao?.[1]} NAV={"$"+nav.toFixed(2)} Title={dao?.[0]} TreasuryAddress={dao?.[3]} />
        <MemberCard />
        <div className={styles.title}>
          Proposals
        </div>
        <ProposalCard />
      </div>
    </>
  );
}