import ageCircuit from "@/noir/age/target/noir.json"
import voteCircuit from "@/noir/vote/target/vote.json"
import voteRevealCircuit from "@/noir/voteReveal/target/voteReveal.json"
import { decompressSync } from "fflate"
import { Crs, newBarretenbergApiAsync, RawBuffer } from "@aztec/bb.js/dest/browser/index.js";
import { ethers } from "ethers"
import initACVM, { executeCircuit, compressWitness } from "@noir-lang/acvm_js";

export async function useNoir() {
    await initACVM();
    const api = await newBarretenbergApiAsync(4)

    const getProofDependencies = async (circuit) => {
        const acirBuffer = Buffer.from(circuit.bytecode, 'base64')
        const acirBufferDecompressed = decompressSync(acirBuffer)
        const [exact, circuitSize, subgroup] = await api.acirGetCircuitSizes(acirBufferDecompressed)
        const subgroupSize = Math.pow(2, Math.ceil(Math.log2(circuitSize)));
        const crs = await Crs.new(subgroupSize + 1);
        await api.commonInitSlabAllocator(subgroupSize);
        await api.srsInitSrs(new RawBuffer(crs.getG1Data()), crs.numPoints, new RawBuffer(crs.getG2Data()));

        const acirComposer = await api.acirNewAcirComposer(subgroupSize);
        return { acirBuffer, acirBufferDecompressed, acirComposer }
    }

    const generateWitness = async (input, acirBuffer) => {
        const initialWitness = new Map();
        initialWitness.set(1, ethers.utils.hexZeroPad(`0x${input.x.toString(16)}`, 32));
        initialWitness.set(2, ethers.utils.hexZeroPad(`0x${input.y.toString(16)}`, 32));

        const witnessMap = await executeCircuit(acirBuffer, initialWitness, () => {
            throw Error('unexpected oracle');
        });

        const witnessBuff = compressWitness(witnessMap);
        return witnessBuff;
    }

    const generateProof = async (circuit, witness) => {
        const { acirBufferDecompressed, acirComposer } = await getProofDependencies(circuit);
        const proof = api.acirCreateProof(
            acirComposer,
            acirBufferDecompressed,
            decompressSync(witness),
            false
        )
        return proof
    }

    const verifyProof = async (circuit, proof) => {
        const { acirBufferDecompressed, acirComposer } = await getProofDependencies(circuit);
        await api.acirInitProvingKey(acirComposer, acirBufferDecompressed)
        const verified = await api.acirVerifyProof(acirComposer, proof, false)
        return verified;
    }

    const verifyZkKyc = async (input) => {
        const acirBuffer = Buffer.from(ageCircuit.bytecode, 'base64')
        const witness = await generateWitness(input, acirBuffer)
        const proof = await generateProof(ageCircuit, witness)
        const isVerified = await verifyProof(ageCircuit, proof)
        return isVerified
    }
    const verifyVote = async (input) => {
        const acirBuffer = Buffer.from(ageCircuit.bytecode, 'base64')
        const witness = await generateWitness(input, acirBuffer)
        const proof = await generateProof(voteCircuit, witness)
        const isVerified = await verifyProof(voteCircuit, proof)
        return isVerified
    }
    const verifyVoteReveal = async (input) => {
        const acirBuffer = Buffer.from(ageCircuit.bytecode, 'base64')
        const witness = await generateWitness(input, acirBuffer)
        const proof = await generateProof(voteRevealCircuit, witness)
        const isVerified = await verifyProof(voteRevealCircuit, proof)
        return isVerified
    }
    return { verifyZkKyc, verifyVote, verifyVoteReveal }
}
