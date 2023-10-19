import styles from "./DaoCard.module.css";

export default function DaoCard({Amount, NAV, Title, KYC, buttonText, setClicked}) {
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
          <button className={styles.btn} onClick={()=>setClicked(true)}>{buttonText}</button>
        </div>
      </div>
    </>
  );
}
