'use client'
import { useEffect, useState } from "react";
import DaoCard from "@/components/DaoCard/DaoCard";
import styles from "./page.module.css";
import { useAuthKit } from "@/hooks/useAuthKit";
import { useAxelar } from "@/hooks/useAxelar";
import { useNoir } from "@/hooks/useNoir";

export default function JoinDao() {
  const { chain, eoa } = useAuthKit();
  const { getAllDaos } = useAxelar();

  const [daos, setDaos] = useState([]);
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    const {verifyZkKyc} = await useNoir()
    const input = { x: 18, y: 18 }
    const isVerified = await verifyZkKyc(input)
    setVerified(isVerified)
  }

  const joinDao = async()=>{}

  useEffect(() => {
    async function getDaos() {
      if (!chain || !eoa) return;
      const daos = await getAllDaos();
      setDaos(daos)
    }
    getDaos();
  }, [chain, eoa]);

  return (
    <div className={styles.container}>
      {
        daos?.map((dao, index) => <DaoCard
          key={index}
          id={index}
          Amount={dao[1]}
          verified={verified}
          KYC={"Age should be above 18"+(verified?(" Verified ZK ✅"):(""))}
          NAV={"$100"}
          Title={dao[0]}
          onClick={verified?joinDao:verify}
        />)
      }
    </div>
  );
}
