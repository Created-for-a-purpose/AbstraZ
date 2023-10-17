'use client'
import styles from "./page.module.css";
import { tech } from "@/utils/tech.js"
import { useAuthKit } from "@/hooks/useAuthKit";

export default function Home() {
  const { login, eoa } = useAuthKit();
  
  function Entry({ props }) {
    return (
      <div className={styles.entry}>
        <img src={props.image}/>
        <div className={styles.details}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.subtitle}>{props.subtitle}</div>
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
          <div className={styles.btn_container}>
            <button className={styles.btn} onClick={login}>{eoa?"Safe account created !":"Create a Safe Account"}</button>
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
          {
            tech.map(
              (item, id) => <Entry key={id} props={item}/>
            )
          }
        </div>
      </div>
    </div>
  );
}
