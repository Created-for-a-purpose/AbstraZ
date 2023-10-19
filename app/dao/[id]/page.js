import MemberCard from "@/components/MemberCard/MemberCard";
import styles from "./page.module.css";
import DaoCard2 from "@/components/DaoCard2/DaoCard2";
import ProposalCard from "@/components/ProposalCard/ProposalCard";

export default function DAO(params) {
  return (
    <>
      <div className={styles.container}>
        <DaoCard2></DaoCard2>
        <MemberCard></MemberCard>
        <div className={styles.title}>
          Proposals
        </div>
        <ProposalCard></ProposalCard>
      </div>
    </>
  );
}
