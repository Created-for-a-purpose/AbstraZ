async function main() {
    const [deployer] = await ethers.getSigners()
    const spongePoseidonLib = "0x12d8C87A61dAa6DD31d8196187cFa37d1C647153";
    const poseidon6Lib = "0xb588b8f07012Dc958aa90EFc7d3CF943057F17d7";
    
    const ageVerifier = await ethers.deployContract("AgeVerifier", [deployer.address]);

    await ageVerifier.waitForDeployment();

    console.log("AgeVerifier deployed to:", ageVerifier.target);
    await setZKRequest(ageVerifier.target);
}

async function setZKRequest(AgeVerifierAddress) {
    const Operators = {
        NOOP: 0, // No operation, skip query verification in circuit
        EQ: 1, // equal
        LT: 2, // less than
        GT: 3, // greater than
        IN: 4, // in
        NIN: 5, // not in
        NE: 6   // not equal
    }
    
    const requestId = 1;
    const circuitId = "credentialAtomicQuerySig";
    const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";
    const schemaHash = "9c2498080a90d43cada7fec79eeee8de"; 
    const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));

    const query = {
        circuitId,
        schema: BigInt(schemaEnd),
        slotIndex: 2,
        operator: Operators.LT, // operator
        value: [20050101, ...new Array(63).fill(0).map(i => 0)], // for operators 1-3 only first value matters
        publicInput: [1]
    };

    let ageVerifier = await ethers.getContractAt("AgeVerifier", AgeVerifierAddress)

    try {
        await ageVerifier.setZKPRequest(
            requestId,
            validatorAddress,
            query
        );
        console.log("Request set");
    } catch (e) {
        console.log("error: ", e);
    }

}

const hexToBytes = (hex) => {
    for (var bytes = [], c = 0; c < hex.length; c += 2) {
        /**
         * @dev parseInt 16 = parsed as a hexadecimal number
         */
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return bytes;
};

const fromLittleEndian = (bytes) => {
    const n256 = BigInt(256);
    let result = BigInt(0);
    let base = BigInt(1);
    bytes.forEach((byte) => {
        result += base * BigInt(byte);
        base = base * n256;
    });
    return result;
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
