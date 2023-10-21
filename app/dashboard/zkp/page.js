"use client";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useTwitter } from "@/hooks/useTwitter";
import { RiTwitterXFill } from "react-icons/ri";
import { TbRating18Plus } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";

export default function ZKP(params) {
  const { data, status } = useSession();
  const { setData, followers } = useTwitter();
  console.log(followers);
  async function handleTwitter() {
    if (status === "unauthenticated") {
      signIn("twitter");
    }
    console.log(followers);
    setData(data.user.access_token);
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>ZK Proofs</h1>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.name}><TbRating18Plus className={styles.red}></TbRating18Plus> Prove age</div>
            <div className={styles.button}>
              <button>Generate proof</button>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.name}>
              <RiTwitterXFill></RiTwitterXFill>{" "}
              Prove twitter followers
            </div>
            <div className={styles.twitter}>
              {followers === "" ? (
                <button onClick={handleTwitter}>Sign in with <RiTwitterXFill className={styles.x}></RiTwitterXFill></button>
              ) : (
                <button>Generate proof</button>
              )}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.name}><HiUserGroup className={styles.green}></HiUserGroup> Prove DAO membership</div>
            <div className={styles.button}>
              <button>Generate Proof</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
