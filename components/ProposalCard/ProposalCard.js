import styles from './ProposalCard.module.css';
export default function ProposalCard({chain}) {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.title}>
                    Proposal Title
                </div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </div>
                <div className={styles.votes}>
                    <button className={styles.btn2}>Vote anonymously</button>
                    {chain==='mumbai'&&<><div className={styles.vote}>⬆️ Up-votes : 0</div>
                    <div className={styles.vote}>⬇️ Down-votes : 0</div></>}
                </div>
            </div>
            <div className={styles.right}>
            <button className={styles.btn}>Generate Proof of Vote 🔑</button>
            </div>
        </div>
        </>
    )
};
