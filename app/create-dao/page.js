'use client'
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import styles from "./page.module.css";
import { FaExternalLinkAlt } from "react-icons/fa"
import { useAuthKit } from "@/hooks/useAuthKit";
import { useAxelar } from "@/hooks/useAxelar";
import Link from "next/link";
import { chains } from "@/utils/chains";

export default function CreateDao() {
  // State variables to store input field values
  const [daoName, setDaoName] = useState(""); // DAO Name
  const [amount, setAmount] = useState(""); // Amount
  const [selectedToken, setSelectedToken] = useState("null"); // Selected Token
  const [selectedZkKyc, setSelectedZkKyc] = useState("null"); // Selected Zk-KYC
  const [inputFields, setInputFields] = useState([]); // MultiSig Treasury
  const [treasuryAddress, setTreasuryAddress] = useState(""); // Treasury Address

  const { eoa, chain, createTreasurySafe } = useAuthKit();
  const { createDao } = useAxelar();

  // Event handlers to update state variables
  const handleDaoNameChange = (e) => {
    setDaoName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  const handleZkKycChange = (e) => {
    setSelectedZkKyc(e.target.value);
  };

  const handleWalletAddressChange = (e, index) => {
    const newInputFields = [...inputFields];
    newInputFields[index].walletAddress = e.target.value;
    setInputFields(newInputFields);
  };

  const handleAddInput = () => {
    const newInputFields = [...inputFields];
    newInputFields.push({ id: newInputFields.length + 1, walletAddress: "" });
    setInputFields(newInputFields);
  };

  const handleSubmit = async ()=>{
    if(!eoa) return;
    const operators = inputFields.map((inputField)=>inputField.walletAddress)
    let tAddress = (treasuryAddress==='')?await createTreasurySafe(operators):treasuryAddress;
    setTreasuryAddress(tAddress)
    await createDao(daoName, amount+' '+selectedToken, selectedZkKyc, tAddress)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Create DAO</div>
        <div className={styles.body}>
          {/* DAO Name input */}
          <div className={styles.input_container}>
            <label>DAO Name</label>
            <div className={styles.input}>
              <Input
                placeholder={" DAO Name"}
                type={"text"}
                fontSize={"1.5rem"}
                value={daoName}
                onChange={handleDaoNameChange}
              />
            </div>
          </div>
          {/* Amount input */}
          <div className={styles.input_container}>
            <label>Minimum Investment</label>
            <div className={styles.input}>
              <Input
                placeholder={" Amount"}
                type={"text"}
                fontSize={"1.5rem"}
                value={amount}
                onChange={handleAmountChange}
              />
              <select
                className={styles.select}
                value={selectedToken}
                onChange={handleTokenChange}
              >
                <option value={"null"} hidden>Select Token</option>
                <option value={"ETH"}>ETH</option>
                <option value={"MATIC"}>MATIC</option>
                <option value={"MNT"}>MNT</option>
              </select>
            </div>
          </div>
          {/* Zk-KYC input */}
          <div className={styles.input_container}>
            <label>zk-KYC</label>
            <div className={styles.input}>
              <select
                className={styles.select}
                value={selectedZkKyc}
                onChange={handleZkKycChange}
              >
                <option value={"null"} hidden>Select Option</option>
                <option value={"min-age:18"}>Minimum age: 18</option>
              </select>
            </div>
          </div>
          {/* MultiSig Treasury input */}
          <div className={styles.input_container}>
            <label>MultiSig Treasury</label>
            <div className={styles.multiInput}>
              {inputFields.map((inputField, index) => (
                <div className={styles.input} key={inputField.id}>
                  <Input
                    placeholder={` Wallet Address of ${index + 1}th owner`}
                    type={"text"}
                    fontSize={"1.5rem"}
                    value={inputField.walletAddress}
                    onChange={(e) => handleWalletAddressChange(e, index)}
                  />
                </div>
              ))}
            </div>
            <div className={styles.input}>
              <button className={styles.btn} onClick={handleAddInput}>
                + Add a new operator
              </button>
            </div>
          </div>
          { treasuryAddress &&
          <div className={styles.safe}>✅ Treasury Address: {treasuryAddress} 
          <Link target="_blank" href={chains[chain].blockExplorer+"/address/"+treasuryAddress}><FaExternalLinkAlt className={styles.safeLink}/></Link>
          </div> }
          <button className={styles.submit} onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </>
  );
}
