'use client'
import styles from "./page.module.css";
import { BsSafe } from "react-icons/bs";
import { SiEthereum } from "react-icons/si";
import { PiLinkSimple, PiClockClockwiseDuotone } from "react-icons/pi";
import Link from "next/link";
import { useAuthKit } from "@/hooks/useAuthKit";
import { chains } from "@/utils/chains";

export default function Dashboard() {
  const { eoa, eoaBalance, chain } = useAuthKit();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.account}>
          <div className={styles.title}>
            <SiEthereum className={styles.color_b}></SiEthereum> Account
          </div>
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.name}>EOA</div>
              <div className={styles.address}>
                <Link href={chains[chain].blockExplorer+"address/"+eoa} target="_blank" style={{textDecoration:"none"}}>
                  {eoa.slice(0,6)+'...'+eoa.slice(-4)}
                </Link>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>Balance</div>
              <div className={styles.address}>{(eoaBalance.toString()/10**18).toFixed(3)} {chains[chain].token}</div>
            </div>
          </div>
        </div>
        <div className={styles.navigate}>
          <div className={styles.title}>
            <PiLinkSimple className={styles.color}></PiLinkSimple> Navigate
          </div>
          <div className={styles.content}>
            <div className={styles.row}>
              <Link className={styles.address} href={"/dashboard/zkp"}>
                ZK Proofs
              </Link>
            </div>
            <div className={styles.row}>
              <Link className={styles.address} href={"/join-dao"}>
                Join a DAO
              </Link>
            </div>
            <div className={styles.row}>
              <Link className={styles.address} href={"/create-dao"}>
                Create a DAO
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.title}>
            <BsSafe className={styles.color}></BsSafe> Safe Addresses
          </div>
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.name}>Safe 1</div>
              <div className={styles.address}>0x123...456</div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>Safe 2</div>
              <div className={styles.address}>0x123...456</div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>Safe 3</div>
              <div className={styles.address}>0x123...456</div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.title}>
            <PiClockClockwiseDuotone className={styles.color}></PiClockClockwiseDuotone> Pending Transactions
          </div>
          <div className={styles.content}>
            <div className={styles.row}>
              <div className={styles.name}>TX1</div>
              <div className={styles.button}>
                <button>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
