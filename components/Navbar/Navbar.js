import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaEthereum } from 'react-icons/fa';

export default function Navbar() {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
            <FaEthereum className={styles.eth}></FaEthereum>
            <Link className={styles.title} href={"/"}>AbstraZ</Link>
        </div>
        <div className={styles.middle}>
            <Link href={"/dashboard"} className={styles.link}>Dashboard</Link>
            <Link href={"/create-dao"} className={styles.link}>Create DAO</Link>
            <Link href={"/join"} className={styles.link}>Join DAO</Link>
        </div>
        <div className={styles.right}>
            <div className={styles.dot}>
                <div className={styles.dot_inner}></div>
            </div>
            <div className={styles.chain}>Mumbai</div>
        </div>
      </nav>
    </>
  );
}
