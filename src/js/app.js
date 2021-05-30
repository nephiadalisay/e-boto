// import * as ecc from '/ecc.js';
// import {main,decrypt, encrypt, power,gen_key, gcd, getRandomInt} from './ecc.js';
// import ecc from "./ecc.js";
// const ecc = require("./ecc.js");

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,
  isRegistered: false,
  role: 0,
  current_addr: '',
  ballot_key,
  canCount: 0,

  init: function() {
    // const ecc = require("./ecc.js");
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

      return App.renderme0();
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
        App.renderme0();
      });
    });
  },

  renderme0: function() {
    var divs = document.getElementsByClassName('this');
      for(var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
      }
      var startbtn = $('#startbtn');
      startbtn.show();

    if(window.ethereum){
      ethereum.enable().then(function(acc){
          App.account = acc[0];
          // $("#accountAddress").html("Your Account: " + App.account);
          // var accountAddress = $('#accountAddress');
          // accountAddress.show();
      }).then(function(i){
        $("#accountAddress").html("Your Account: " + App.account);
      });
    }
    
    // App.contracts.Election.deployed().then(function(ist){
    //   return candidatesCount;
    // }).then(function(result){
    //   App.canCount = result;
    // });
    

  },

  renderme: function() {
    // App.contracts.Election.deployed().then(function(instance){
      
    //   return instance.persons2("0x181a49aa65d3cd83cDEEB56fad2618068C001C56");
    // }).then(function(result){
    //   res = "0x181a49aa65d3cd83cDEEB56fad2618068C001C56"
    //   $("#myrole").html("Your !!!Role: " + res.toLowerCase());
    //   $("#myrole2").html("Your !!!Role: " + App.account);
    // })

    if(window.ethereum){
      ethereum.enable().then(function(acc){
          App.account = acc[0];
          $("#myrole").html("Your Role: " + App.role);
          $("#accountAddress").html("Your Account: " + App.account);
          // var accountAddress = $('#accountAddress');
          // accountAddress.show();
      });
    }


    
    
////////////////////////////
App.contracts.Election.deployed().then(function(instance) {
  electionInstance = instance;
  return electionInstance.personsCount();
}).then(function(personsCount) {
  var candidatesResults = $("#candidatesResults1");
  candidatesResults.empty();

  var candidatesSelect = $('#candidatesSelect1');
  candidatesSelect.empty();

  // For displaying candidates
  for (var i = 0; i <= personsCount; i++) {
    electionInstance.persons(i).then(function(person) {
      var id = person[0];
      var addr = person[1];
      var role = person[2];

      // Render candidate Result
      var candidateTemplate = "<tr><th>" + id + "</th><td>" + addr + "</td><td>" + role + "</td></tr>"
      candidatesResults.append(candidateTemplate);

    });
  }
});
///////////////////////////
////////////////////////////
App.contracts.Election.deployed().then(function(instance1) {
  electionInstance1 = instance1;
  return electionInstance1.allVotesCount();
}).then(function(votescount) {
  var candidatesResults = $("#candidatesResults2");
  candidatesResults.empty();


  // For displaying candidates
  for (var i = 1; i <= votescount; i++) {
    electionInstance1.myVotes(i).then(function(addr) {
      App.contracts.Election.deployed().then(function(instance3){
        return instance3.myVotes2(addr);
      }).then(function(vowt){
          // Render candidate Result
        var candidateTemplate = "<tr><th>" + addr + "</th><td>" + vowt + "</td><td>" 
        candidatesResults.append(candidateTemplate);
      })

    });
  }
});
///////////////////////////

    if(App.role == 0){
      var divs = document.getElementsByClassName('this');
      for(var i = 0; i < divs.length; i++) {
        divs[i].style.display = "none";
      }

      var start_div = $("#start_div");
      start_div.show();
    }
    else if (App.role == 1) {
      App.render();
    }
    else if (App.role == 2){
      App.reg_elecauth();
    }
    
    
  },


  reg_elecauth: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    
    // if(window.ethereum){
    //   ethereum.enable().then(function(acc){
    //       App.account = acc[0];
    //       // $("#accountAddress").html("Your Account: " + App.account);
    //       // var accountAddress = $('#accountAddress');
    //       // accountAddress.show();
    //   });
    // }
  
    // App.role = 2;

    // App.contracts.Election.deployed().then(function(instance) {
    //   // $("#accountAddress").html("Your !!!Account: " + App.role);
    //   if(!instance.isRegistered(App.account)){
    //     App.role = 2;
    //     return instance.register(App.account, App.role, { from: App.account });
    //   }
    //   else if(instance.isRegistered(App.account)){
    //     x = instance.isRegistered(App.account);
    //     App.isRegistered = true;
    //     $("#myrole").html("Your !!!Account: " + App.account);
    //     var already_reg = $("#already_reg");
    //     already_reg.show();
    //   }
    // }).then(function(result){
    //   if(!App.isRegistered){
    //     var elecauth_div = $("#elecauth_div");
    //     $("#myrole").html("Your Role: " + App.role);
    //     elecauth_div.show();
    //   }
      
    // }).catch(function(err) {
    //   console.error(err);
    // });
    
    App.contracts.Election.deployed().then(function(instance) {
      return instance.isRegistered(App.account);
    }).then(function(regged){
      if(!regged){
        App.role = 2;
        App.contracts.Election.deployed().then(function(instance2) {
          return instance2.register(App.account, App.role, { from: App.account });
        }).then(function(result){
          var elecauth_div = $("#elecauth_div");
          $("#myrole").html("Your Role: " + App.role);
          elecauth_div.show();
        })
      }
      else{
        App.isRegistered = true;
        $("#myrole").html("Your Account: " + App.account);
        var already_reg = $("#already_reg");
        already_reg.show();
        // var voter_btn2 = $("#voter_btn2");
        // voter_btn2.show();
        
      }
    }).catch(function(err) {
      console.error(err);
    });

    
  },



  reg_voter: function() {
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }


    // App.role = 1;

    // App.contracts.Election.deployed().then(function(instance) {
    //   if(!instance.isRegistered(App.account)){
    //     App.role = 1;
    //     return instance.register(App.account, App.role, { from: App.account });
    //   }
    //   else{
    //     App.isRegistered = true;
    //     var already_reg = $("#already_reg");
    //     already_reg.show();
    //   }
    // }).then(function(result){
    //   if(!App.isRegistered){
    //     App.render();
    //   }
    // }).catch(function(err) {
    //   console.error(err);
    // });
    acct_str = String(App.account)
    App.contracts.Election.deployed().then(function(instance) {
      return instance.isRegistered(acct_str);
    }).then(function(regged){
      if(!regged){
        // var already_reg = $("#already_reg");
        // already_reg.show();
        App.role = 1;
        App.contracts.Election.deployed().then(function(instance2) {
          return instance2.register(acct_str, App.role, { from: acct_str });
        }).then(function(result){
          App.render();
        })
      }
      else{
        App.isRegistered = true;
        $("#myrole").html("Your Account: " + acct_str);
        var already_reg = $("#already_reg");
        already_reg.show();

        
      }
      // else{ // if in database
      //   App.contracts.Election.deployed().then(function(instance2){
      //     return instance2.persons2(App.account);
      //   }).then(function(acct){
      //     if (acct==0){ // but not registered as voter
      //       App.contracts.Election.deployed().then(function(instance3){
      //         App.role = 1;
      //         return instance3.addVoter(App.account, App.role, {from:App.account});
      //       }).then(function(result){
      //         App.render();
      //       })
      //     }
      //     else{
      //       App.isRegistered = true;
      //       $("#myrole").html("Your Account: " + App.account);
      //       var already_reg = $("#already_reg");
      //       already_reg.show();
      //     }
      //   }) 
      // }
    }).catch(function(err) {
      console.error(err);
    });
    

  },

  sign_in:function() {
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    // getting role of account
    App.contracts.Election.deployed().then(function(instance) {
      // if(instance.regged)
      return instance.persons2(App.account);//.then(function(acc_uint){
        //App.role = acc_uint;
      //})

    }).then(function(result){
      // $("#myrole2").html("Your !!!Role: " + instance.persons2(result));
      App.role = result;
      if(App.role == 1){
        var role_words1 = $("#role_words1");
        role_words1.show();
        App.render();
      }
      else if (App.role == 2) {
        var elecauth_div = $("#elecauth_div");
        $("#myrole").html("Your Role: " + App.role);
        var role_words2 = $("#role_words2");
        role_words2.show();
        elecauth_div.show();
      }
      else{
        App.contracts.Election.deployed().then(function(instance){
          return instance.persons2(App.account);
        }).then(function(result){
          $("#myrole2").html("Your !!!Role: " + result);
        })

        var no_acct = $("#no_acct");
        no_acct.show();
      }
      
    }).catch(function(err) {
      console.error(err);
    });

    // App.contracts.Election.deployed().then(function(instance) {
    //   return instance.sign_in(App.account, { from: App.account });
    // }).then(function(result){
    //   // $("#loader").show();
    //   App.render();
    // }).catch(function(err) {
    //   console.error(err);
    // });

  },

  ed_vote: function(){
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var ed_vote_div = $("#ed_vote_div");
    var ed_vote_btn = $('#ed_vote_btn')
    
    ed_vote_div.show();
    ed_vote_btn.show();

  },

  edit_voters: function(){
    voter_eth_wallet = (document.getElementById("voter_eth_wallet").value).toLowerCase();
    voter_email = document.getElementById("voter_email").value;
    // is_regged = false;
    // voter_eth_wallet_addr = ""

    // App.contracts.Election.deployed().then(function(instance){
    //   return instance.addVoter(voter_eth_wallet, 1, {from: App.account});
    // }).then(function(result){
    //   App.render();
    // }).catch(function(err) {
    //   console.error(err);
    // // });

    // App.contracts.Election.deployed().then(function(instance){
    //   return instance.parseAddr(voter_eth_wallet)
    // })
    
    var already_voter = $("#already_voter");
        already_voter.hide();

    // App.contracts.Election.deployed().then(function(instance){
    //   isregged = instance.isRegistered(voter_eth_wallet);      
    // })

    // if(!is_regged){
    //   App.contracts.Election.deployed().then(function(instance){
    //       return instance.register(voter_eth_wallet,1,{from:App.account});
    //   }).then(function(result){
    //     App.render();
    //   })
    // }
    // else{
    //   var already_voter = $("#already_voter");
    //   already_voter.show();
    // }

    App.contracts.Election.deployed().then(function(instance){
      return instance.isRegistered(voter_eth_wallet);
    }).then(function(regged){
      if(!regged){
        App.contracts.Election.deployed().then(function(instance2){
          role = 1;

          // App.contracts.Election.deployed().then(function(instance11){
          //   current_addr =  instance11.parseAddr(voter_eth_wallet);
          // })
          // $("#myrole2").html("Your !!!Role: " + result);
          return instance2.register(voter_eth_wallet,role,{from:String(App.account)});
          // // instance2.isRegistered(voter_eth_wallet)=true;
          // return instance2.addDB(voter_eth_wallet, role, {from: App.account});
        }).then(function(result){
          App.render();
        })
      }
      else{
        //////////////        
        // $("#myrole").html("Your Account: " + App.account);

        // THIS ONE SHOWS THAT ACC IS ALREADY IN DB WITH PROPER ROLE!!!
        App.contracts.Election.deployed().then(function(i){
          return i.persons2(voter_eth_wallet);
        }).then(function(role){
          $("#myrole2").html("MY ROLE HOY!: " + role);
        })


        var already_voter = $("#already_voter");
        already_voter.show();
      }
    }).catch(function(err){
      console.error(err);
    })
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

    //////////////////////////////////////
    App.contracts.Election.deployed().then(function(instance) {
      instance.addElection(myid);
    });
    //////////////////////////////////


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

    // if(window.ethereum){
    //   ethereum.enable().then(function(acc){
    //       App.account = acc[0];
    //       $("#accountAddress").html("Your Account: " + App.account);
    //   });
    // }
    // loader.hide();
    // content.show();

    // Load contract data
    /////////////
    // App.contracts.Election.deployed().then(function(instance) {
    //   electionInstance = instance;
    //   return electionInstance.candidatesCount();
    // }).then(function(candidatesCount) {
    //   var candidatesResults = $("#candidatesResults");
    //   candidatesResults.empty();

    //   var candidatesSelect = $('#candidatesSelect');
    //   candidatesSelect.empty();

    //   for (var i = 1; i <= candidatesCount; i++) {
    //     electionInstance.candidates(i).then(function(candidate) {
    //       var id = candidate[0];
    //       var name = candidate[1];
    //       var voteCount = candidate[2];

    //       // Render candidate Result
    //       var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
    //       candidatesResults.append(candidateTemplate);

    //       // Render candidate ballot option
    //       var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    //       candidatesSelect.append(candidateOption);
    //     });
    //   }
    //   return electionInstance.voters(App.account);
    // }).then(function(hasVoted) {
    //   // Do not allow a user to vote
    //   if(hasVoted) {
    //     $('form').hide();
    //   }
    //   loader.hide();
    //   content.show();
    // }).catch(function(error) {
    //   console.warn(error);
    // });

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
    var divs = document.getElementsByClassName('this');
    for(var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }

    var add_can_div = $("#add_can_div");
    var addcanbtn = $('#addcanbtn')
    
    add_can_div.show();
    addcanbtn.show();

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
    $("#myrole").html("Your Role: " + App.role);
    // var role_words1 = $("#role_words1");
    // role_words1.show();
    
    // var divs = document.getElementsByClassName('this');
    // for(var i = 0; i < divs.length; i++) {
    //   divs[i].style.display = "none";
    // }
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
          App.account = str(acc[0]);
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

      // For displaying candidates
      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // if (App.role == 0 || App.role == 2){
          //   var candidatesSelect = $("#forvoteronly");
          //   candidatesSelect.hide();
          // }
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
      if(hasVoted||App.role==0||App.role==2) {
        $('form').hide();
      }
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });

  },


  castVote: function() {

    ////////////////////////////////SPECIAL FX PART//////////////////////////////////
    function merge(s1,s2) {
      result = '';
    
      i = 0;
    
      while ((i<s1.length) || (i<s2.length)){
          if (i<s1.length){
              result = result + s1[i];
          }
    
          if (i<s2.length){
              result = result + s2[i];
          }
    
          i = i+1;
      }
    
      return result;
    }
    ////////////////////////////////SPECIAL FX PART//////////////////////////////////

  //   ///////////////////////////////////////////////////// ECC PART ////////////////////////////////////
  function getRandomInt (min, max) {
    var min1 = Math.ceil(min);
    var max1 = Math.floor(max);
    return Math.floor(Math.random() * (max1 - min1) + min1); //The maximum is exclusive and the minimum is inclusive
  }
  
  function gcd(a, b){
      if (a < b) {
          return gcd(b, a)
      }
      else if ((a % b) == 0) {
          return b;
      }
          
      else {
          return gcd(b, a % b)
      }	
  }
  
  function gen_key(q){
      var key = getRandomInt(Math.pow(10,0), q);
      while (gcd(q, key) != 1){
          key = getRandomInt(Math.pow(10,0),q);
          // console.log(key);
      }
      return key;
  }
  
  function power(a, b, c){
    var x = 1
    var y = a
  
    while (b > 0){
          if ((b % 2) == 0){
              x = (x * y) % c;
          }	
      var y = (y * y) % c;
      var b = parseInt(b / 2);
      }
  
    return x % c;
  }
  
  function encrypt(msg, q, h, g){
      var en_msg = [];
  
      var k = gen_key(q); // Private key for sender
      var s = power(h, k, q);
      var p = power(g, k, q);
      
      for(i=0; i<msg.length;i++){
          en_msg = en_msg.concat(msg[i]);
      }
  
      // print("g^k used : ", p)
      // print("g^ak used : ", s)
  
      for(i=0; i<msg.length;i++){
          // console.log(en_msg[i]);
          en_msg[i] = s * (en_msg[i].charCodeAt(0));
      }
  
      return [en_msg, p];
  }
  
  function decrypt(en_msg, p, key, q){
      var dr_msg = [];
      var h = power(p, key, q);
  
      for(i=0; i<en_msg.length;i++){
          console.log("DR MSG IS", dr_msg);
  
          dr_msg = dr_msg.concat(String.fromCharCode(parseInt((en_msg[i]/h) )));
      }
  
  
      return dr_msg;
  }
  
  function ecc_main(msg){
    // var msg = "nephia";
    // print("Original Message :", msg)
    console.log("Original Message :", msg);
  
    var q = getRandomInt(Math.pow(10,0), Math.pow(10,5));	// very large number
  // console.log("hi1", q);
    var g = getRandomInt(2,q);
    // console.log("hi2");
  
    var key = gen_key(q) // Private key for receiver
    // console.log("hi3");
    var h = power(g, key, q)
    // console.log("hi4");
    // print("g used : ", g)
    console.log("g used : ", g);
    // print("g^a used : ", h)
    console.log("g^a used : ", h);
  
    var full_en_msg = encrypt(msg, q, h, g);
    var en_msg = full_en_msg[0];
    console.log("en_msg : ", en_msg);
    var p = full_en_msg[1];
    // console.log("p : ", p);
    // console.log("key : ", key);
    // console.log("q : ", q);
    // var dr_msg = decrypt(en_msg, p, key, q);
    // var dmsg = dr_msg.join('');

    // console.log("Decrypted Message :", dmsg);
    return en_msg;
    
  }  
  // ///////////////////////////////////////////////////// ECC PART^ //////////////////////////////////// 

  ///////////////////////////////////////////////////// ECC PART2 //////////////////////////////////// 
  function keyGeneration(p,P,n){
    var min1 = 1;
    var max1 = n;
    d = Math.floor(Math.random() * (max1 - min1) + min1);

    Q = d*P;

    return [Q,d];
  }

  function Encryption(p,P,n,Q,M){
    var min1 = 1;
    var max1 = n;
    k = Math.floor(Math.random() * (max1 - min1) + min1);

    C1 = k*P;
    C2 = M + k*Q;

    return [C1,C2];
  }

  function Decryption(p,P,n,d,C1,C2){
    M = C2 - d*C1;

    return M;
  }


  function ECCEncrypt(p,P,n,Q,vote){ // vote = [v0,v1,v2,v3,...] --> 1 person's votes for x candidates

    var encrypted_vote = []; // [[a1,a2],[b1,b2],[c1,c2],...]

    for(i=0;i<vote.length;i++){ // vote.length = how many candidates
      encrypt_answer = Encryption(p,P,n,Q,vote[i]);
      C1 = 6911111111111111111111111111111111111111111111111111111111111111111111111;
      C2 = 4200000000000000000000000000000000000000000000000000000000000000000000000;
      // C1 = parseInt(encrypt_answer[0]);
      // C2 = parseInt(encrypt_answer[1]);
      // C1 = encrypt_answer[0];
      // C2 = encrypt_answer[1];
      // C1 = parseInt(String(encrypt_answer[0]).substring(0,5));
      // C2 = parseInt(String(encrypt_answer[1]).substring(0,5));
      // encrypted_vote.push(C1);
      // encrypted_vote.push(C2);
      encrypted_vote.push(parseInt(C1));
      encrypted_vote.push(parseInt(C2));
    }
    return encrypted_vote; // e.v. of 1person's votes for x candidates  // [a1,a2,b1,b2,c1,c2]

  }

  function ECCDecrypt1(encrypted_vote_all){ // encrypted_vote = [[[a1,a2],[b1,b2],[c1,c2]], [[a1,a2],[b1,b2],[c1,c2]], [[a1,a2],[b1,b2],[c1,c2]]]
    
    // p = (2^255) - 77372353535851937790883648493;

    // voter1 = [[a1,a2],[b1,b2],[c1,c2],...]
    // voter2 = [[a1,a2],[b1,b2],[c1,c2],...]
    // voter3 = [[a1,a2],[b1,b2],[c1,c2],...]
    // sum    = [[a1+a1+a1, a2+a2+a2],[b1+b1+b1, b2+b2+b2], [c1+c1+c1, c2+c2+c2]]
    //        = [[A1,A2], [B1,B2], [C1,C2]]
    //        = Decrypt[A1,A2], Decrypt[B1,B2], Decrypt[C1,C2]
    //        = Result(A), Result(B), Result(C)

    
    sum1=0;
    sum2=0;
    var toDecrypt = [];
    var finalTally = [];

    for(j = 0; j < encrypted_vote_all[0].length; j++){
      sum1=0;
      sum2=0;
      for (i=0; i<encrypted_vote_all.length; i++){
        sum1 = sum1 + encrypted_vote_all[i][j][0];
        sum2 = sum2 + encrypted_vote_all[i][j][1];
  
        if(i == encrypted_vote_all.length){
          i=0;
          break;
        }
      
      }
      toDecrypt.push([sum1, sum2]); //[[A1,A2], [B1,B2], [C1,C2]]
    }
    console.log(toDecrypt);

    for(n=0;n<toDecrypt.length;n++){
      x = Decryption(p,P,n,d,toDecrypt[n][0],toDecrypt[n][1]);
      finalTally.push(x);
    }

    return finalTally;
  }  

  function ECCDecrypt(p,P,n,d,voteArray_encrypted){
    M = [];
    for(i=0;i<4;i++){
      if(i==0 || (i%2)==0){
        M.push(voteArray_encrypted[i+1] - d*voteArray_encrypted[i]);
      }
    }
    return M;
  }
  ///////////////////////////////////////////////////// ECC PART2^ //////////////////////////////////// 

    var candidateId = $('#candidatesSelect').val(); // getting the vote value

    // initializing our domain parameters
      var p = (2**255) - 19;
      //  E : y^2 = x^3 + 486662x^2 + x
      var P = 9;
      var n = (2**252) + 27742317777372353535851937790883648493;
      
    // Key Generation
      var keyGen = keyGeneration(p,P,n);
      var Q = keyGen[0];
      var d = keyGen[1];

    // Vote Encryption
      App.canCount =2;
      var voteArray = new Array(App.canCount); // declare array to store voter's vote for all candidates
      var canIndex = candidateId - 1; // for correct indexing, for old process
      // for loop to place the vote values in the array. 
      // Example (0,1,0,0) is a vote for Cand2, there are 4 candidates
      
      for(i=0; i<App.canCount; i++){
        if(i == canIndex){
          voteArray[i] = 1;
        }
        else{
          voteArray[i] = 0;
        }
      }

      var voteArray_encrypted = ECCEncrypt(p,P,n,Q,voteArray); //voteArray=[0,1,0],,,, will return [a1,a2,b1,b2,c1,c2] --> a1&a2 are ciphertexts of vote for candidate1

    // Ballot Key Generation
      // var encrypted_vote = (String(voteArray_encrypted[0]).substring(0,5)).concat(String(voteArray_encrypted[1]).substring(0,5)); // gets the encrypted vote of Candidate1 always for ballot key generation only
      var encrypted_vote = String(voteArray_encrypted[0]).substring(0,10); // gets the encrypted vote of Candidate1 always for ballot key generation only
      ballot_key = merge(String(App.account).substring(0,10), String(encrypted_vote)).replaceAll('.',''); 
      App.ballot_key = ballot_key;








      // test decryption
      var decrypted_values = ECCDecrypt(p,P,n,d,voteArray_encrypted);

    // candidateId_spoof = parseInt(candidateId) + 56789; // turning vote into larger number so we can encrypt better

    // encryption of vote,, this is what should be stored in mapping 'voter_id => encrypted_vote'
    encrypted_vote1 = String(ecc_main(String(candidateId))); 
    // encrypted_vote1 = '59';
    // voteArray_encrypted = [[12,13],[14,15]];

    // merging ETH wallet with encrypted vote,,, this is the ballot key
    // ballot_key = merge(String(App.account).substring(0,10), String(encrypted_vote)).replaceAll(',',''); 
    // App.ballot_key = ballot_key;

    // Render ballot key display
    // var candidateTemplate = "<tr><th>spoof " + ballot_key + "</th><td>acct"  + "</td><td>"  +"</td></tr>"
    // candidatesResults2.append(candidateTemplate);

    

    // var hi = [[1,2],[3,4],[5,6]];
    // var hi1 = [1,2,3,4,5]
    App.contracts.Election.deployed().then(function(instance) {
      // return instance.vote(candidateId, { from: App.account });
      // return instance.vote(candidateId, encrypted_vote, { from: App.account });
      return instance.vote(candidateId, encrypted_vote1, voteArray_encrypted, { from: App.account });


    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();

      $("#ballot_key").html("Your Ballot Key is: " + App.ballot_key);
      var myKey = $('#ballot_key');
      myKey.show();

      $("#nephia").html("Real Vote:"+voteArray+"Encrypted vote:" + voteArray_encrypted +"Decrypted Vote:"+ decrypted_values).innerHTML;
      var ballot_key = $('#nephia');
      ballot_key.show();

      // setTimeout(show_ballot_key(), 500);
      // show_ballot_key();
      
      $("#loader").show(); 
      // $("#ballot_key").html("Your Ballot Key is: " + ballot_key);
      // // Render candidate Result
      //   var candidateTemplate = "Your"
      //   candidatesResults.append(candidateTemplate);
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

      // $("#content").hide();
      // $("#loader").show();    
      App.render();

      ///////////////////////////////
      // App.contracts.Election.deployed().then(function(instance) {
      //   electionInstance = instance;
      //   return electionInstance.candidatesCount();
      // }).then(function(candidatesCount) {
      //   var candidatesResults = $("#candidatesResults");
      //   candidatesResults.empty();
  
      //   // var candidatesSelect = $('#candidatesSelect');
      //   // candidatesSelect.empty();
  
      //   // For displaying candidates
      //   for (var i = 1; i <= candidatesCount; i++) {
      //     electionInstance.candidates(i).then(function(candidate) {
      //       var id = candidate[0];
      //       var name = candidate[1];
      //       var voteCount = candidate[2];
  
      //       // Render candidate Result
      //       var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
      //       candidatesResults.append(candidateTemplate);
  
      //       // // Render candidate ballot option
      //       // var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
      //       // candidatesSelect.append(candidateOption);
      //     });
      //   }
      //   return electionInstance.voters(App.account);
      // });
      ///////////////////////////////

      //$("#addcanbtn").hide();
    }).catch(function(err) {
      console.error(err);
    });
  }

  // ///////////////////////////////////////////////////// ECC PART ////////////////////////////////////
  // getRandomInt: function (min, max) {
  //   var min1 = Math.ceil(min);
  //   var max1 = Math.floor(max);
  //   return Math.floor(Math.random() * (max1 - min1) + min1); //The maximum is exclusive and the minimum is inclusive
  // },
  
  // gcd: function(a, b){
  // 	if (a < b) {
  //         return gcd(b, a)
  //     }
  // 	else if ((a % b) == 0) {
  //         return b;
  //     }
          
  // 	else {
  //         return gcd(b, a % b)
  //     }	
  // },
  
  // gen_key: function(q){
  // 	var key = getRandomInt(Math.pow(10,0), q);
  // 	while (gcd(q, key) != 1){
  //         key = getRandomInt(Math.pow(10,0),q);
  //         // console.log(key);
  //     }
  // 	return key;
  // },
  
  // power: function(a, b, c){
  //   var x = 1
  //   var y = a
  
  //   while (b > 0){
  //         if ((b % 2) == 0){
  //             x = (x * y) % c;
  //         }	
  //     var y = (y * y) % c;
  //     var b = parseInt(b / 2);
  //     }
  
  //   return x % c;
  // },
  
  // encrypt: function(msg, q, h, g){
  // 	var en_msg = [];
  
  // 	var k = gen_key(q); // Private key for sender
  // 	var s = power(h, k, q);
  // 	var p = power(g, k, q);
      
  //     for(i=0; i<msg.length;i++){
  //         en_msg = en_msg.concat(msg[i]);
  //     }
  
  // 	// print("g^k used : ", p)
  // 	// print("g^ak used : ", s)
  
  //     for(i=0; i<msg.length;i++){
  //     	// console.log(en_msg[i]);
  //         en_msg[i] = s * (en_msg[i].charCodeAt(0));
  //     }
  
  // 	return [en_msg, p];
  // },
  
  // decrypt: function(en_msg, p, key, q){
  // 	var dr_msg = [];
  // 	var h = power(p, key, q);
  
  //     for(i=0; i<en_msg.length;i++){
  //     	console.log("DR MSG IS", dr_msg);
  
  //         dr_msg = dr_msg.concat(String.fromCharCode(parseInt((en_msg[i]/h) )));
  //     }
  
  
  // 	return dr_msg;
  // },
  
  // ecc_main: function(msg){
  //   // var msg = "nephia";
  //   // print("Original Message :", msg)
  //   console.log("Original Message :", msg);
  
  //   var q = getRandomInt(Math.pow(10,0), Math.pow(10,5));	// very large number
  // // console.log("hi1", q);
  //   var g = getRandomInt(2,q);
  //   // console.log("hi2");
  
  //   var key = gen_key(q) // Private key for receiver
  //   // console.log("hi3");
  //   var h = power(g, key, q)
  //   // console.log("hi4");
  //   // print("g used : ", g)
  //   console.log("g used : ", g);
  //   // print("g^a used : ", h)
  //   console.log("g^a used : ", h);
  
  //   var full_en_msg = encrypt(msg, q, h, g);
  //   var en_msg = full_en_msg[0];
  //   console.log("en_msg : ", en_msg);
  //   var p = full_en_msg[1];
  //   // console.log("p : ", p);
  //   // console.log("key : ", key);
  //   // console.log("q : ", q);
  //   // var dr_msg = decrypt(en_msg, p, key, q);
  //   // var dmsg = dr_msg.join('');

  //   // console.log("Decrypted Message :", dmsg);
  //   return en_msg;
    
  // },
  
  // ///////////////////////////////////////////////////// ECC PART //////////////////////////////////// 
  

};

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });

// const ecc = require("./ecc.js");
App.init();