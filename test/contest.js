var Contest = artifacts.require("./Contest.sol");

contract("Contest", function(accounts){

	// to check if getting initialized correctly
	it("initializes with five contestants", function(){
		return Contest.deployed().then(function(instance) {
			return instance.contestantsCount();
		}).then(function(count) {
			assert.equal(count, 5);
		});
	});

	it("initializes the contestants with the correct values", function() {
		return Contest.deployed().then(function(instance) {
			contestInstance = instance;
			return contestInstance.contestants(1);
		}).then(function(contestant) {
			assert.equal(contestant[0], 1, "contains the correct id");
			assert.equal(contestant[1], "Irfan", "contains the correct name");
			assert.equal(contestant[2], 0, "contains the correct votes count");
			return contestInstance.contestants(2);
		}).then(function(contestant) {
			assert.equal(contestant[0], 2, "contains the correct id");
			assert.equal(contestant[1], "Zahid", "contains the correct name");
			assert.equal(contestant[2], 0, "contains the correct votes count");
			return contestInstance.contestants(3);
		}).then(function(contestant) {
			assert.equal(contestant[0], 3, "contains the correct id");
			assert.equal(contestant[1], "Ishtiaq", "contains the correct name");
			assert.equal(contestant[2], 0, "contains the correct votes count");
			return contestInstance.contestants(4);
		}).then(function(contestant) {
			assert.equal(contestant[0], 4, "contains the correct id");
			assert.equal(contestant[1], "Talha", "contains the correct name");
			assert.equal(contestant[2], 0, "contains the correct votes count");
			return contestInstance.contestants(5);
		}).then(function(contestant) {
			assert.equal(contestant[0], 5, "contains the correct id");
			assert.equal(contestant[1], "Jawad", "contains the correct name");
			assert.equal(contestant[2], 0, "contains the correct votes count");
		});
	});

	it("allows a voter to caste a vote", function() {
		return Contest.deployed().then(function(instance){
			contestInstance = instance;
			constestantId = 2;
			return contestInstance.vote(constestantId, { from : accounts[0]});
		}).then(function(receipt) {
			return contestInstance.voters(accounts[0]);
		}).then(function(voted) {
			assert(voted, "the voter was marked as voted");
			return contestInstance.contestants(constestantId);
		}).then(function(contestant){
			var voteCount = contestant[2];
			assert.equal(voteCount, 1, "increments the contestant's vote count");
		})
	});

});