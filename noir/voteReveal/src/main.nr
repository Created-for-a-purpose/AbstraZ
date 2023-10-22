use dep::std;

fn main(commitment: pub Field, proposalId: pub Field, publicKey: pub Field, vote: Field, secret: Field) {
    let voteCommitment = std::hash::pedersen([proposalId, publicKey, vote, secret]);
    assert(commitment == voteCommitment[0]);
}