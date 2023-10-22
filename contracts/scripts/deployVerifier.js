async function main() {
    console.log("Deploying verifier...");
    const dc = await ethers.deployContract("VoteVerifier");
    await dc.waitForDeployment();
    console.log("Verifier deployed to:", dc.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
