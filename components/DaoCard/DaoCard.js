import styles from "./DaoCard.module.css";
import Link from "next/link";

export default function DaoCard({id, Amount, NAV, Title, KYC, verified, onClick}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            {Title}
          </div>
          <div className={styles.property}>
            Treasury NAV : {NAV}
          </div>
          <div className={styles.property}>
          Minimum Investment: {Amount}
          </div>
          <div className={styles.property}>
            ZK-KYC/VC: {KYC}
          </div>
        </div>
        <div className={styles.right}>
          <button className={styles.btn} onClick={onClick}>{verified?<Link href={`/dao/${id}`} className={styles.join}>Join DAO</Link>:"Verify zk-KYC/VC"}</button>
        </div>
      </div>
    </>
  );
}
