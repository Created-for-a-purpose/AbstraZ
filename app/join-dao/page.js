import DaoCard from "@/components/DaoCard/DaoCard";
import styles from "./page.module.css";

export default function JoinDao() {
  return (
    <div className={styles.container}>
      <DaoCard
        Amount={1}
        KYC={"Age should be above 18"}
        NAV={1}
        Title={"Title"}
      ></DaoCard>
      <DaoCard
        Amount={1}
        KYC={"Age should be above 18"}
        NAV={1}
        Title={"Title"}
      ></DaoCard>
    </div>
  );
}
