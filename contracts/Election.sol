pragma solidity ^0.5.16; // remove '^' to lock the actual solidity version (to decrease security risks)

contract Election {
    // // Store candidate
    // // Read candidate
    // string public candidate; // state variable - accessible inside contract (represent data that belongs to entire contract)
    // // Constructor - smth that's gonna get run whenever contract is initialized upon migration
    // constructor () public { // we use this for this ver, not the 'function Election () public' one
    //     candidate = "Nephia Dalisay"; 
    // }

    // Model a Candidate
        struct Candidate {
            uint id;    // unsigned integer
            string name;
            uint voteCount;
        }

    // Store accounts that have voted
    mapping(address => bool) public voters;


    // Store Candidate
    // Fetch Candidate
        mapping(uint => Candidate) public candidates; // mapping(_KeyType => _ValueType) public mappingName

    // Store Candidates Count
        uint public candidatesCount; //used to keep track of how many candidates there are (iterating not possible in Solidity)

    // constructor function is responsible for initializing upon call of Election smart contract
    constructor () public { // we use this for this ver, not the 'function Election () public' one
        addCandidate("Nephia Dalisay!");
        addCandidate("Bianca Bueno!");
    }

    function addCandidate (string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true; // msg.sender is x in 'from:x'

        // update candidate vote count
        candidates[_candidateId].voteCount ++;

    }
}