// Solidity Version check in command prompt > truffle version
pragma solidity 0.4.24;

// creating the contract
contract Contest {

	// creating structure to model the contestant
	struct Contestant {
		uint id;
		string name;
		uint voteCount;
	}

	// use mapping to get or fetch the contestant details
	mapping(uint => Contestant) public contestants;

	// to save the list of users/accounts who already casted vote
	mapping(address => bool) public voters;

	//add a public state variable to keep track of contestant Count
	uint public contestantsCount;

	event votedEvent (
		uint indexed _contestantId
	);

	function Contest () public {
		addContestant("Irfan");
		addContestant("Zahid");
		addContestant("Ishtiaq");
		addContestant("Talha");
		addContestant("Jawad");
	}

	// add a function to add contestant
	function addContestant (string _name) private {
		contestantsCount++;
		contestants[contestantsCount] = Contestant(contestantsCount, _name, 0);
	}

	function vote (uint _contestantId) public {
		// restricting the person who already casted the vote
		require(!voters[msg.sender]);
		// require that the vote is casted to valid contestant
		require(_contestantId > 0 && _contestantId <= contestantsCount);
		// increment contestant votes
		contestants[_contestantId].voteCount++; 
		// metadata for voter casted the vote = true
		voters[msg.sender] = true;
		
		// trigger the vote event
		votedEvent(_contestantId);
	}
}