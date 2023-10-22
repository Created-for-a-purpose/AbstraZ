import styles from "./DaoCard2.module.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import { chains } from "@/utils/chains";
import { useAuthKit } from "@/hooks/useAuthKit";

export default function DaoCard2({ Amount, NAV, Title, TreasuryAddress }) {
  const {chain} = useAuthKit();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.title}>🏦 {Title || "Loading..."}</div>
            <div className={styles.property}>💰Treasury NAV : {NAV}</div>
            <div className={styles.property}>💲Minimum Investment: {Amount}</div>
            <div className={styles.property}>🪙Treasury Address:
              <Link href={chains[chain].blockExplorer+"address/"+TreasuryAddress} target="_blank" className={styles.link}>
                {TreasuryAddress?.slice(0, 6) + "..." + TreasuryAddress?.slice(-4)}
                <FaExternalLinkAlt className={styles.linkImage}/>
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.composition_title}>💹 Treasury Composition</div>
            <div className={styles.composition_value}>28% MNT</div>
            <div className={styles.composition_value}>28% ETH</div>
            <div className={styles.composition_value}>52% MATIC</div>
          </div>
        </div>
        <div className={styles.bottom}>
          <button className={styles.btn}>Invest 💵</button>
        </div>
      </div>
    </>
  );
}
