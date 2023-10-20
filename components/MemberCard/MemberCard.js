import styles from "./MemberCard.module.css";

export default function MemberCard(params) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>Name</div>
        <div className={styles.role}>
            <p>Member</p>
        </div>
        <div className={styles.investment}>
            Your Investment: <span>$0.00</span>
        </div>
        <div className={styles.button}>
            <button>Upgrade role ⬆️</button>
        </div>
        <div className={styles.button}>
            <button>Withdraw ⬇️</button>
        </div>
      </div>
    </>
  );
}
