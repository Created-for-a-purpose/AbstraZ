'use client'
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import styles from "./page.module.css";
import { FaExternalLinkAlt } from "react-icons/fa"
import { useAuthKit } from "@/hooks/useAuthKit";

export default function CreateDao(params) {
  // State variables to store input field values
  const [daoName, setDaoName] = useState(""); // DAO Name
  const [amount, setAmount] = useState(""); // Amount
  const [selectedToken, setSelectedToken] = useState("null"); // Selected Token
  const [selectedZkKyc, setSelectedZkKyc] = useState("null"); // Selected Zk-KYC
  const [inputFields, setInputFields] = useState([]); // MultiSig Treasury
  const [treasuryAddress, setTreasuryAddress] = useState(""); // Treasury Address

  const { eoa, safes, createTreasurySafe } = useAuthKit();

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
    const operators = inputFields.map((inputField)=>inputField.walletAddress)
    const treasuryAddress = await createTreasurySafe(operators)
    setTreasuryAddress(treasuryAddress)
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
                <option value={"Eth"}>ETH</option>
                <option value={"Matic"}>MATIC</option>
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
                <option value={"minAge"}>Minimum age: 18</option>
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
          { treasuryAddress!=='' &&
          <div className={styles.safe}>✅ Treasury Address: {treasuryAddress} 
          <FaExternalLinkAlt className={styles.safeLink}/>
          </div> }
          <button className={styles.submit} onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </>
  );
}
