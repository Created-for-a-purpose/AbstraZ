const Operators = {
    NOOP: 0, // No operation, skip query verification in circuit
    EQ: 1, // equal
    LT: 2, // less than
    GT: 3, // greater than
    IN: 4, // in
    NIN: 5, // not in
    NE: 6   // not equal
}

async function main() {
    const address = "0x97c0bB8d57540FC75ECa33C92C6e023A2a09cc65"
    // await setZKRequest(address);
    // return
    const poseidonFacade = "0xD65f5Fc521C4296723c6Eb16723A8171dCC12FB0";
    const validatorAddress = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450"
    // const ageVerifierc = await ethers.getContractAt("AgeVerifier", address);
    // const value= [20050101, ...new Array(63).fill(0).map(i => 0)]
    // const schemaBigInt = "74977327600848231385663280181476307657"
    // const schemaClaimPathKey = "20376033832371109177683048456014525905119173674985843915445634726167450989630"
    // const result=await ageVerifierc.setZKPRequest(1,validatorAddress,schemaBigInt,schemaClaimPathKey,2,value);
    // console.log('result', result.hash)
    // return

    const AgeVerifier = await ethers.getContractFactory("AgeVerifier", {
        libraries: {
            PoseidonFacade: poseidonFacade,
        },
    });

    const ageVerifier = await AgeVerifier.deploy();
    console.log("Contract address:", ageVerifier.target);
}

async function setZKRequest(AgeVerifierAddress) {
    console.log("Age verifier contract:", AgeVerifierAddress);

    const schemaBigInt = "74977327600848231385663280181476307657"
    // merklized path to field in the W3C credential according to JSONLD  schema e.g. birthday in the KYCAgeCredential under the url "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld"
    const schemaClaimPathKey = "20376033832371109177683048456014525905119173674985843915445634726167450989630"
    const requestId = 1;
    const query = {
        schema: schemaBigInt,
        claimPathKey: schemaClaimPathKey,
        operator: Operators.LT, // operator
        value: [20050101, ...new Array(63).fill(0).map(i => 0)], // for operators 1-3 only first value matters
    };

    let ageVerifier = await ethers.getContractAt("AgeVerifier", AgeVerifierAddress);

    const validatorAddress = "0xF2D4Eeb4d455fb673104902282Ce68B9ce4Ac450"; // sig validator
    // const validatorAddress = "0x3DcAe4c8d94359D31e4C89D7F2b944859408C618"; // mtp validator
    // const req = await ageVerifier.getZKPRequest(requestId); 
    // console.log("Request: ", req);
    // return;
    const txId = await ageVerifier.setZKPRequest(
        requestId,
        validatorAddress,
        query.schema,
        query.claimPathKey,
        query.operator,
        query.value, 
        { gasLimit: "1000000"}
    );
    console.log("Request set: ", txId.hash);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
