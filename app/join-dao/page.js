'use client'
import { useEffect, useState } from "react";
import DaoCard from "@/components/DaoCard/DaoCard";
import styles from "./page.module.css";
import { useAuthKit } from "@/hooks/useAuthKit";
import { useAxelar } from "@/hooks/useAxelar";
import { QRCodeSVG } from "qrcode.react";
import ageProofRequest from "@/utils/ageProofRequest.json"

export default function JoinDao() {
  const { chain, eoa } = useAuthKit();
  const { getAllDaos } = useAxelar();

  const [daos, setDaos] = useState([]);
  const [clicked, setClicked] = useState(false);

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
          Amount={dao[1]}
          KYC={"Age should be above 18"}
          NAV={"$100"}
          Title={dao[0]}
          setClicked={setClicked}
        />)
      }
      {clicked &&
        <div className={styles.qr}>
          <QRCodeSVG
          value={JSON.stringify(ageProofRequest)} 
          height={200} width={200}
        /></div>}
    </div>
  );
}
