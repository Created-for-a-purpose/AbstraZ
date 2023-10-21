'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaEthereum } from 'react-icons/fa';

export default function Navbar() {
  const [selectedChain, setSelectedChain] = useState('Mumbai');

  const handleChainChange = (event) => {
    setSelectedChain(event.target.value);
  };

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          <FaEthereum className={styles.eth} />
          <Link className={styles.title} href={"/"}>AbstraZ</Link>
        </div>
        <div className={styles.middle}>
          <Link href={"/dashboard"} className={styles.link}>Dashboard</Link>
          <Link href={"/create-dao"} className={styles.link}>Create DAO</Link>
          <Link href={"/join-dao"} className={styles.link}>Join DAO</Link>
        </div>
        <div className={styles.right}>
          <div className={styles.dot}>
            <div className={styles.dot_inner}></div>
          </div>
          <div className={styles.chainDropdown}>
            <select
              value={selectedChain}
              onChange={handleChainChange}
              className={styles.chainSelect} 
            >
              <option value="Mumbai">Mumbai</option>
              <option value="OtherChain">Other Chain</option>
            </select>
          </div>
        </div>
      </nav>
    </>
  );
}
