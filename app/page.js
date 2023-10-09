import TechCard from "@/components/TechCard/TechCard";
import styles from "./page.module.css";

export default function Home() {
  function Entry(props) {
    return (
      <div className={styles.entry}>
        <img src="https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp"></img>
        <div className={styles.details}>
          <div className={styles.title}>SafeCore</div>
          <div className={styles.subtitle}>
            Now, even your grandmother can use this Dapp
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.title}>AbstraZ</div>
          <div className={styles.body}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.image}>
            <img src="https://ethereum.org/static/754d2f72ce2296fb59d9d974aeda16be/e2b9b/future_transparent.png" />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>Technologies Used</div>
        <div className={styles.list}>
          <Entry></Entry>
          <Entry></Entry>
          <Entry></Entry>
          <Entry></Entry>
          <Entry></Entry>
          <Entry></Entry>
          <Entry></Entry>
        </div>
      </div>
    </div>
  );
}
