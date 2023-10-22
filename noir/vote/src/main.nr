use dep::std;

fn main(proposalId: pub Field, publicKey: pub Field, voteF: Field, secretF: Field, vote:u8) -> pub [Field;2] {
    let voteCommitment = std::hash::pedersen([proposalId, publicKey, voteF, secretF]);
    let nullifierHash = std::hash::pedersen([proposalId, publicKey]);
    assert(vote>=0);
    assert(vote<=1);
    [nullifierHash[0], voteCommitment[0]]
}