import styles from "./page.module.css";
import DaoCard2 from "@/components/DaoCard2/DaoCard2";

export default function DAO(params) {
  return (
    <>
      <div className={styles.container}>
        <DaoCard2></DaoCard2>
      </div>
    </>
  );
}
