App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = ethereum;
      ethereum.enable();
      web3 = new Web3(ethereum);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.renderme();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {
    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.renderme();
      });
    });
  },

  renderme: function() {
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var start_div = $("#start_div");
    start_div.show();
    
  },


  create_election: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var create_election_div = $("#create_election_div");
    create_election_div.show();
  },

  custom_election: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    myid = App.makeid();
    document.getElementById("election_id").value = myid;
    var custom_election_div = $("#custom_election_div");
    
    custom_election_div.show();
  },

  auth_homepage: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var auth_homepage_div = $("#auth_homepage_div");
    
    auth_homepage_div.show();
  },

  add_can: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var add_can_div = $("#add_can_div");
    var addcanbtn = $('#addcanbtn')
    
    add_can_div.show();
    addcanbtn.show();

    if(window.ethereum){
      ethereum.enable().then(function(acc){
          App.account = acc[0];
          $("#accountAddress").html("Your Account: " + App.account);
      });
    }
    // loader.hide();
    // content.show();

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });

  },

  edit_pxn: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var edit_pxn_div = $("#edit_pxn_div");
    
    edit_pxn_div.show();
  },

  newElement: function() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value; //store this in array or struct or smth
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  },

  deleteelement: function(){

  },
 
  rendernephia: function() {
    var loader = $("#loader");
    var start = $("#start");
    var nephia = $("nephia");
    var content = $("#content");

    loader.hide();
    start.show();
    nephia.show();
    content.hide();
  },

  makeid: function() {
    length = 10;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  render: function() {
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    var start = $("#start");
    //var addcanbtn = $('#addcanbtn')

    loader.show();
    start.show();
    content.hide();
    //addcanbtn.show();

    // Load account data
    // web3.eth.getCoinbase(function(err, account) {
    //   if (err === null) {
    //     App.account = account;
    //     $("#accountAddress").html("Your Account: " + account);
    //   }
    // });
    if(window.ethereum){
      ethereum.enable().then(function(acc){
          App.account = acc[0];
          $("#accountAddress").html("Your Account: " + App.account);
      });
    }
    // loader.hide();
    // content.show();

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          // Render candidate ballot option
          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
          candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function() {
    var candidateId = $('#candidatesSelect').val();
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  addCandidate: function() {
    // var divs = document.getElementsByClassName('this');
    // for(var i = 0; i < divs.length; i++) {
    //   divs[i].style.display = "none";
    // }
    // var addcanbtn = $("#addcanbtn");
    // addcanbtn.show();

    // document.getElementById("voter_btn").onclick = function(){
    //   document.getElementById("addcanbtn").show();
    // }

    some_name = document.getElementById("candidateName").value
    App.contracts.Election.deployed().then(function(instance) {
      return instance.addCandidate(some_name, { from: App.account });
    }).then(function(result) {
      // Wait for candidates to update
      $("#content").hide();
      $("#loader").show();    
      //$("#addcanbtn").hide();
    }).catch(function(err) {
      console.error(err);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});