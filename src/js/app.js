App = {
  web3Provider: null,
  contracts: {},
  account: 0x0 ,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Contest.json", function(contest) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Contest = TruffleContract(contest);
      // Connect provider to interact with contract
      App.contracts.Contest.setProvider(App.web3Provider);
    
   // App.listenForEvents();
    return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Contest.deployed().then(function(instance) {
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event);
        // reload when a new vote is recorded
        App.render();
      })
    })
  },

  render: function() {
    var contestInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html(
          '<span style="color: #00bc8c;" class="glyphicon glyphicon-user" aria-hidden="true"></span> <strong style="color: #00bc8c;">Your account:</strong> ' + account);
        }
    });

    // Load contract data
    App.contracts.Contest.deployed().then(function(instance) {
      contestInstance = instance;
      return contestInstance.contestantsCount();
    }).then(function(contestantsCount) {
      var contestantsResults = $("#contestantsResults");
      contestantsResults.empty();

      var contestantsSelect = $('#contestantsSelect');
      contestantsSelect.empty();

     

      for (var i = 1; i <= contestantsCount; i++) {
        contestInstance.contestants(i).then(function(contestant) {
          var id = contestant[0];
          var name = contestant[1];  
          var voteCount = contestant[2];

          // Render contestant Result
          var contestantTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td  class='votes' data-name='"+ name +"' data-votes='" + voteCount + "'>" + voteCount + "</td></tr>"
          contestantsResults.append(contestantTemplate);

          // Render candidate voting option
          var contestantsOption = "<option value='" + id + "'>" + name + "</option>";
          contestantsSelect.append(contestantsOption);

          });   
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
    
  },

  casteVote: function() {
    var contestantId = $('#contestantsSelect').val();
    App.contracts.Contest.deployed().then(function(instance) {
      return instance.vote(contestantId, {from : App.account })
    }).then(function(result) {
      // wait for votes to update
      $("#content").hide();
      $("#loader").show();
      var alert='<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>  <strong>Well done!</strong> Your vote casted successfully!.</div>'
      $(alert).prependTo("body");
      setTimeout(function() {
        window.location.reload();
      }, 3000)
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();


  });
});