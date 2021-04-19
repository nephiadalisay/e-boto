pragma solidity ^0.5.16; // remove '^' to lock the actual solidity version (to decrease security risks)

contract Election {
    // // Store candidate
    // // Read candidate
    // string public candidate; // state variable - accessible inside contract (represent data that belongs to entire contract)
    // // Constructor - smth that's gonna get run whenever contract is initialized upon migration
    // constructor () public { // we use this for this ver, not the 'function Election () public' one
    //     candidate = "Nephia Dalisay"; 
    // }

    // // Model a Person
        struct Person {
            uint id;
            string addr;
            uint role;
        }

    // Model a Candidate
        struct Candidate {
            uint id;    // unsigned integer
            string name;
            uint voteCount;
        }

        struct Election_Instance {
            string code;
            bool ongoing;
        }

    // Store all people
        mapping (uint => Person) public persons;
        mapping (string => uint) public persons2; // address => role_num 

    // Store all election instances
        mapping (uint => Election_Instance) public election_instances;

    // Store accounts that have voted
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    mapping(address => bool) public voters;
        // mapping(string => Voter) public voters;

    mapping(address => bool) public isRegistered;

    // Store Candidate
    // Fetch Candidate
        mapping(uint => Candidate) public candidates; // mapping(_KeyType => _ValueType) public mappingName

    // Store Candidates Count
        uint public candidatesCount; //used to keep track of how many candidates there are (iterating not possible in Solidity)

    // Election Instances Count
        uint public electionInstancesCount;

    // Persons Count
        uint public personsCount;

    // constructor function is responsible for initializing upon call of Election smart contract
    constructor () public { // we use this for this ver, not the 'function Election () public' one
        addCandidate("Nephia Dalisay!");
        addCandidate("Bianca Bueno!");
    }

    function addCandidate (string memory _name) public {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addElection (string memory _code) public{
        electionInstancesCount ++;
        election_instances[electionInstancesCount] = Election_Instance(_code, false);
    }

    function register(string memory _addr, uint _role) public {        
        address myAddress_addr = parseAddr(_addr);
        // require that they haven't registered before
        require(!isRegistered[myAddress_addr]);
        isRegistered[myAddress_addr] = true;
        personsCount ++;
        persons[personsCount] = Person(personsCount, _addr, _role);
        persons2[_addr] = _role;
    }

    function addVoter(string memory _addr2, uint _role2) public {        
        address myAddress_addr = parseAddr(_addr2);
        // string myAddress_str = _addr;
        
        require(!isRegistered[myAddress_addr]);
        isRegistered[myAddress_addr] = true;
        personsCount ++;
        persons[personsCount] = Person(personsCount, _addr2, _role2);
        persons2[_addr2] = _role2;
    }

    // function addDB(string memory _addr3, uint _role3) public {
    //     persons2[_addr3] = _role3;
    // }

    // function sign_in (string memory _addr) public {
    //     require(!persons2[_addr]);
    //     person_uint = persons2[_addr];
    // }

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

    function parseAddr(string memory _a) public returns (address _parsedAddress) {
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i = 2; i < 2 + 2 * 20; i += 2) {
            iaddr *= 256;
            b1 = uint160(uint8(tmp[i]));
            b2 = uint160(uint8(tmp[i + 1]));
            if ((b1 >= 97) && (b1 <= 102)) {
                b1 -= 87;
            } else if ((b1 >= 65) && (b1 <= 70)) {
                b1 -= 55;
            } else if ((b1 >= 48) && (b1 <= 57)) {
                b1 -= 48;
            }
            if ((b2 >= 97) && (b2 <= 102)) {
                b2 -= 87;
            } else if ((b2 >= 65) && (b2 <= 70)) {
                b2 -= 55;
            } else if ((b2 >= 48) && (b2 <= 57)) {
                b2 -= 48;
            }
            iaddr += (b1 * 16 + b2);
        }
        return address(iaddr);
}

}