import styles from "./MemberCard.module.css";

export default function MemberCard({ verified, verify }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>You</div>
        <div className={styles.role}>
            <p>{verified?"Active":"Member"}</p>
        </div>
        <div className={styles.investment}>
            Your Investment: <span>$0.00</span>
        </div>
        <div className={styles.button}>
            <button onClick={verify}>{verified?"Upgraded ✅":"Upgrade role ⬆️"}</button>
        </div>
        <div className={styles.button}>
            <button>Withdraw ⬇️</button>
        </div>
      </div>
    </>
  );
}
