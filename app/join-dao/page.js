'use client'
import { useEffect, useState } from "react";
import DaoCard from "@/components/DaoCard/DaoCard";
import styles from "./page.module.css";
import { useAuthKit } from "@/hooks/useAuthKit";
import { useAxelar } from "@/hooks/useAxelar";

export default function JoinDao() {
  const { chain, eoa } = useAuthKit();
  const { getAllDaos } = useAxelar();

  const [daos, setDaos] = useState([]);

  useEffect(() => {
    async function getDaos() {
      if(!chain || !eoa) return;
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
          Amount={dao[1]}
          KYC={"Age should be above 18"}
          NAV={"$100"}
          Title={dao[0]}
        />)
      }
    </div>
  );
}
