async function main() {
  const gateway = "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B"
  // const gateway = "0x999117D44220F33e0441fbAb2A5aDB8FF485c54D"
  const gasService = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"
  const ccd = await ethers.deployContract("CrosschainDAO", [gateway, gasService],
  { gasLimit: "0x1000000" });

  await ccd.waitForDeployment();

  console.log("CrosschainDAO deployed to:", ccd.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
