async function main() {
  console.log("Deploying DataConsumer...");
  const dc = await ethers.deployContract("DataConsumer");
  await dc.waitForDeployment();

  console.log("DataConsumer deployed to:", dc.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
