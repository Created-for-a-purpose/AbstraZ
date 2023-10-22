async function main() {
  const mumbaiGateway = "0xBF62ef1486468a6bd26Dd669C06db43dEd5B849B"
  const zkevmGateway = "0x999117D44220F33e0441fbAb2A5aDB8FF485c54D"
  const mantleGateway = "0xe432150cce91c13a887f7D836923d5597adD8E31"
  const gasService = "0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6"
  const verifier= "0x3430352A5CC115705A5a6d563Ae5fbC9C1673434"
  const ccd = await ethers.deployContract("CrosschainDAO", [zkevmGateway, gasService, verifier],
  // { gasLimit: "0x1000000" }
  );

  await ccd.waitForDeployment();

  console.log("CrosschainDAO deployed to:", ccd.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
