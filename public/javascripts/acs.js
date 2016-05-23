 var app5733acc47b6ec69067950e75 = angular.module('app5733acc47b6ec69067950e75', ['chart.js', 'ultimateDataTableServices', 'frapontillo.bootstrap-duallistbox']);
 app5733acc47b6ec69067950e75.controller('ctrl5733af407b6ec69067950e83', ['$scope', '$http', 'datatable', function($scope, $http, datatable) {
     $scope.$broadcast('loadctrl5733af407b6ec69067950e83');
     $scope.lstCountries = [{ "disp": "Swaziland", "val": "swaziland" }];
     $scope.lstBanks = [{ "disp": "FNB", "val": "fnb" }];
     $scope.loggedUser = [];
     $scope.activity = 'active';
     $scope.amount = 500;
     $scope.level = 0;

     $scope.currPledges = [];
     $scope.newUsers = [];

     //$scope.payStack = [];

     $scope.totamtnew = 0;
     $scope.totamtpledges = 0;
     $scope.totamtpayouts = 0;

     //$scope.top5users = [];

     $scope.func5733afd47b6ec69067950e84 = function() {
         //console.log("it ran");
         $('#obj5733ae1d7b6ec69067950e7d,#obj5733adf17b6ec69067950e7a').hide();


     }

     $scope.userLogout = function() {
         $('#welcomeInfo').show();
         $scope.func5733d527e859309c6e7ef1f0();
         $scope.func5733afd47b6ec69067950e84();
         $scope.loggedUser = [];
     }

     $scope.sendSMS = function(num, msg) {
         $http.get('http://api.clickatell.com/http/sendmsg?user=SECCRMSMS&password=SqjJf4sd&api_id=3602185&to=' + num + '&text=' + msg);
     }

     $scope.func5733afd47b6ec69067950e84();
     $scope.func5733b06e2c0df60768a81ff1 = function() {
         console.log("it ran");
         $('#obj5733ae1d7b6ec69067950e7d, #welcomeInfo').hide();
         $('#obj5733adf17b6ec69067950e7a').show();

     }

     $scope.func5733b0ae2c0df60768a81ff2 = function() {
         $('#obj5733adf17b6ec69067950e7a, #welcomeInfo').hide();
         $('#obj5733ae1d7b6ec69067950e7d').show();

     }

     $scope.func5733bcdbc3bf1b32692373e5 = function() {
         fullNamePatt = /^[a-z ,.'-]+$/i;
         phoneNumPatt = /^\+(?:[0-9] ?){10,10}[0-9]$/;
         unamePatt = /^[a-z0-9_-]{3,16}$/;
         accNumPatt = /^\d{11}$/;
         passKeyPatt = /^[a-zA-Z0-9!@#$%^&*]{5,16}$/;
         if (($scope.fname == null) || !(fullNamePatt.test($scope.fname))) {
             alert("First name must contain only Alphabets, please fix it!");
         } else if (($scope.lname == null) || !(fullNamePatt.test($scope.lname))) {
             alert("Last name must contain only Alphabets, please fix it!");
         } else if (($scope.contactNum == null) || !(phoneNumPatt.test($scope.contactNum))) {
             alert("Contact number must be written in international format, e.g +26800000000!");
         } else if (($scope.username == null) || !(unamePatt.test($scope.username))) {
             alert("Username must be alphanumeric and small letters only, please fix it!");
         } else if ($scope.country == null) {
             alert("Please select a Country!");
         } else if ($scope.bank == null) {
             alert("Please select a Bank!");
         } else if (($scope.bankAccount == null) || !(accNumPatt.test($scope.bankAccount))) {
             alert("Account number must be 11 digits, please fix it!");
         } else if (($scope.bankAccountHolder == null) || !(fullNamePatt.test($scope.bankAccountHolder))) {
             alert("Account Holder must contain only Alphabets, please fix it!");
         } else if (($scope.passkey == null) || !(passKeyPatt.test($scope.passkey))) {
             alert("Password must be at least 5 characters long, please fix it!");
         } else if (($scope.confpasskey == null) || !($scope.passkey == $scope.confpasskey)) {
             alert("Yours passwords do not match, please fix that!");
         } else {
             $http.post('/route5733bcdbc3bf1b32692373e5', { fname: $scope.fname, lname: $scope.lname, contact: $scope.contactNum, uname: $scope.username, country: $scope.country, bank: $scope.bank, acc: $scope.bankAccount, accholder: $scope.bankAccountHolder, upass: $scope.passkey, confupass: $scope.confpasskey, new: true }).success(function(resp) {
                 //console.log(resp);
                 if (resp == 'user exists') {
                     alert("Error! Username already in use, please pick another and try again...!");
                 } else {
                     contactN = $scope.contactNum.substring(1);
                     theWelcomeMsg = "ACS-MOOLAR: \n Welcome " + $scope.fname + " " + $scope.lname + " \n Please prepare E 500.00, you will get an instruction to deposit it to an account \n Thank You";
                     alert("Congratulations you have registered! You can now login...!");
                     //http://api.clickatell.com/http/sendmsg?user=SECCRMSMS&password=SqjJf4sd&api_id=3602185&to=26876472655&text=Tesing%20API
                     //$http.post('http://api.clickatell.com/http/sendmsg?user=SECCRMSMS&password=SqjJf4sd&api_id=3602185&to=' + contactN + '&text=' + theWelcomeMsg);
                     $scope.sendSMS(contactN, theWelcomeMsg);
                     //Form Clean up
                     $scope.fname = null;
                     $scope.lname = null;
                     $scope.contactNum = null;
                     $scope.username = null;
                     $scope.country = null;
                     $scope.bank = null;
                     $scope.bankAccount = null;
                     $scope.bankAccountHolder = null;
                     $scope.passkey = null;
                     $scope.confpasskey = null;
                 }
             });
         }

     }

     $scope.func5733d165d8d777276e976db2 = function() {
         user = $scope.loggedUser[0];
         defaultPledge = {
             "fname": user.fname,
             "lname": user.lname,
             "contact": user.contact,
             "country": user.country,
             "bank": user.bank,
             "acc": user.acc,
             "accholder": user.accholder,
             "activity": "active",
             "amount": 500,
             "level": 0,
             "daymonth": "none",
             "uname": user.uname,
             "numPays": 0,
             "served": false
         };
         contactN = defaultPledge.contact.substring(1);
         theProxyMsg = "ACS-MOOLAR: \n Thank you for creating a new proxy, \n " + user.fname + " " + user.lname + " \n Please prepare E 500.00, you will get an instruction to deposit it into an account \n Thank You";
         //console.log(defaultPledge);
         $scope.sendSMS(contactN, theProxyMsg);
         //console.log(defaultPledge);
         $http.post('/route5733d165d8d777276e976db2', defaultPledge).success(function(resp) {
             //console.log(resp);
             $('#obj5733ca3f55f6869c6d0c74d9, #welcomeInfo').hide();
             //$scope.getNewUsers();
             $scope.getUserPledges();
             $scope.getUserInstrs();
             $scope.getUserPayouts();
         });

     }

     $scope.func5733d527e859309c6e7ef1f0 = function() {
         $('#obj5733c0e68cf6330c6a5f5944,#obj5733c1328cf6330c6a5f5947, #welcomeInfo1').hide();
         //$('').show();

     }

     $scope.func5733d527e859309c6e7ef1f0();
     $scope.func5733c02088c2df8e69761970 = function() {
         //console.log("...logging...");
         //Logging in
         $http.post('/route5733c02088c2df8e69761970', { logUname: $scope.logUname, logPass: $scope.logPass }).success(function(resp) {
             if (resp.length == 0) {
                 alert("Wrong username/password or user does not exist!");
             } else {
                 $scope.loggedUser = resp;
                 if (resp.length != 0) {
                     $('#obj5733adf17b6ec69067950e7a, #obj5733ada17b6ec69067950e77, #obj5733ca3f55f6869c6d0c74d9, #obj5733ae1d7b6ec69067950e7d').hide();
                     $('#obj5733c0e68cf6330c6a5f5944').show();

                     if ($scope.logUname == 'root') {
                         $('#welcomeInfo').hide();
                         $("#obj5733c1328cf6330c6a5f5947").show();
                         //$scope.getUserInstrs();
                         $scope.getUserPayouts();
                         //$scope.getPayStackRoot();
                         $scope.getNewUsers();
                         $scope.getLevel1Users();
                         $scope.getLevel2Users();
                         $scope.getLevel3Users();
                         $scope.getLevel4Users();

                         $scope.getInlineL1();
                         $scope.getInlineL2();
                         $scope.getInlineL3();
                         $scope.getInlineL4();

                         //Comment out after testing
                         //$scope.getUserPayouts();
                     } else {
                         $scope.getUserPledges();
                         $scope.getUserInstrs();
                         $scope.getUserPayouts();
                     }
                 }
             }
         });

     }

     $scope.showMakePledge = function() {
         $('#obj5733ca3f55f6869c6d0c74d9').show();
     };

     $scope.getUserPledges = function() {
         $http.post('/getUserPledges', { uname: $scope.loggedUser[0]['uname'] }).success(function(resp) {
             //console.log(resp);
             $scope.currPledges = resp;
         });

     };

     $scope.getUserInstrs = function() {
         $http.post('/getUserInstrs', { uname: $scope.loggedUser[0]['uname'], activity: { $ne: "complete" } }).success(function(resp) {
             console.log(resp);
             $scope.currInstrs = resp;
         });

     };

     $scope.getUserPayouts = function() {
         $http.post('/getUserInstrs', { userToServe: $scope.loggedUser[0]['uname'], activity: { $ne: "complete" } }).success(function(resp) {
             console.log(resp);
             $scope.currPayouts = resp;
         });

     };

     $scope.paidInstr = function(instrId, status) {
         $http.post('/paidInstr', { _id: instrId, status: status }).success(function(resp) {
             //console.log(resp);
             $scope.getUserInstrs();
             $scope.getUserPayouts();
         });
     };

     $scope.getUserPledgesRoot = function() {
         $http.post('/getUserPledges', {}).success(function(resp) {
             //console.log(resp);
             $scope.currPledges = resp;
             console.log(resp);
         });

     }

     $scope.getPayStackRoot = function() {
         $http.post('/getPayStack', {}).success(function(resp) {
             console.log(resp);
             $scope.currPledges = resp;
         });

     }

     $scope.getUser = function(uid) {
         $http.post('/getUser', { uname: uid }).success(function(resp) {
             //console.log(resp);
             $scope.currentPayee = resp[0];
             console.log(resp[0]);
         });

     }

     $scope.getPayeeL1 = function() {
         //$http.post('/getUser', { uname: uid }).success(function(resp) {
         //console.log(resp);
         $scope.currentPayee = $scope.inlineL1[0];
         //console.log(resp[0]);
         //});

     }

     $scope.getPayeeL2 = function() {
         //$http.post('/getUser', { uname: uid }).success(function(resp) {
         //console.log(resp);
         $scope.currentPayee = $scope.inlineL2[0];
         //console.log(resp[0]);
         //});

     }

     $scope.getPayeeL3 = function() {
         //$http.post('/getUser', { uname: uid }).success(function(resp) {
         //console.log(resp);
         $scope.currentPayee = $scope.inlineL3[0];
         //console.log(resp[0]);
         //});

     }

     $scope.getPayeeL4 = function() {
         //$http.post('/getUser', { uname: uid }).success(function(resp) {
         //console.log(resp);
         $scope.currentPayee = $scope.inlineL4[0];
         //console.log(resp[0]);
         //});

     }

     $scope.initPayout = function() {
         //console.log($scope.currPledges[0]);
         //$scope.getUser($scope.currPledges[0].user);
         $scope.getPayeeL1();
         lenNewUsers = $scope.newUsers.length;
         reqUsers = 5;
         $scope.myTop5users = [];
         if (lenNewUsers < reqUsers) {
             console.log("not enough members!")
         } else {
             for (var i = 0; i < reqUsers; i++) {
                 //console.log($scope.newUsers[i]);
                 $scope.myTop5users.push($scope.newUsers[i]);
             }
             $scope.top5users = $scope.myTop5users
             console.log($scope.top5users);
         }
     };

     $scope.initPayout1 = function() {
         //console.log($scope.currPledges[0]);
         //$scope.getUser($scope.currPledges[0].user);
         $scope.getPayeeL2();
         lenNewUsers = $scope.level1Users.length;
         reqUsers = 5;
         $scope.myTop5users = [];
         if (lenNewUsers < reqUsers) {
             console.log("not enough members!")
         } else {
             for (var i = 0; i < reqUsers; i++) {
                 //console.log($scope.newUsers[i]);
                 $scope.myTop5users.push($scope.level1Users[i]);
             }
             $scope.top5users = $scope.myTop5users
             console.log($scope.top5users);
         }
     };

     $scope.initPayout2 = function() {
         //console.log($scope.currPledges[0]);
         //$scope.getUser($scope.currPledges[0].user);
         $scope.getPayeeL3();
         lenNewUsers = $scope.level2Users.length;
         reqUsers = 5;
         $scope.myTop5users = [];
         if (lenNewUsers < reqUsers) {
             console.log("not enough members!")
         } else {
             for (var i = 0; i < reqUsers; i++) {
                 //console.log($scope.newUsers[i]);
                 $scope.myTop5users.push($scope.level2Users[i]);
             }
             $scope.top5users = $scope.myTop5users
             console.log($scope.top5users);
         }
     };

     $scope.initPayout3 = function() {
         //console.log($scope.currPledges[0]);
         //$scope.getUser($scope.currPledges[0].user);
         $scope.getPayeeL4();
         lenNewUsers = $scope.level3Users.length;
         reqUsers = 5;
         $scope.myTop5users = [];
         if (lenNewUsers < reqUsers) {
             console.log("not enough members!")
         } else {
             for (var i = 0; i < reqUsers; i++) {
                 //console.log($scope.newUsers[i]);
                 $scope.myTop5users.push($scope.level3Users[i]);
             }
             $scope.top5users = $scope.myTop5users
             console.log($scope.top5users);
         }
     };

     $scope.getNewUsers = function() {
         $http.post('/getNewUsers', { level: 0, activity: 'active', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.newUsers = resp;
             totalusers = resp.length;
             $scope.totamtnew = totalusers * 500;
         });

     }

     $scope.getInlineL1 = function() {
         $http.post('/getNewUsers', { level: 1, activity: 'inline', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.inlineL1 = resp;
             totalInlineL1 = resp.length;
             $scope.totamtInlineL1 = totalInlineL1 * 500;
         });

     }

     $scope.getLevel1Users = function() {
         $http.post('/getNewUsers', { level: 1, activity: 'active', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.level1Users = resp;
             totalL1users = resp.length;
             $scope.totamtL1 = totalL1users * 1000;
         });

     }

     $scope.getInlineL2 = function() {
         $http.post('/getNewUsers', { level: 2, activity: 'inline', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.inlineL2 = resp;
             totalInlineL2 = resp.length;
             $scope.totamtInlineL2 = totalInlineL2 * 500;
         });

     }

     $scope.getLevel2Users = function() {
         $http.post('/getNewUsers', { level: 2, activity: { $ne: "inline" }, served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.level2Users = resp;
             totalL2users = resp.length;
             $scope.totamtL2 = totalL2users * 3000;
         });

     }

     $scope.getInlineL3 = function() {
         $http.post('/getNewUsers', { level: 3, activity: 'inline', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.inlineL3 = resp;
             totalInlineL3 = resp.length;
             $scope.totamtInlineL3 = totalInlineL3 * 500;
         });

     }

     $scope.getLevel3Users = function() {
         $http.post('/getNewUsers', { level: 3, activity: { $ne: "inline" }, served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.level3Users = resp;
             totalL3users = resp.length;
             $scope.totamtL3 = totalL3users * 8000;
         });

     }

     $scope.getInlineL4 = function() {
         $http.post('/getNewUsers', { level: 4, activity: 'inline', served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.inlineL4 = resp;
             totalInlineL4 = resp.length;
             $scope.totamtInlineL4 = totalInlineL4 * 500;
         });

     }

     $scope.getLevel4Users = function() {
         $http.post('/getNewUsers', { level: 4, activity: { $ne: "inline" }, served: { $ne: true } }).success(function(resp) {
             //console.log(resp);
             $scope.level4Users = resp;
             totalL4users = resp.length;
             $scope.totamtL4 = totalL4users * 10000;
         });

     }

     $scope.changePledgeActivity = function(proxyId, status) {
         $http.post('/changePledgeActivity', { _id: proxyId, status: status }).success(function(resp) {
             //console.log(resp);
             //$('#obj5733ca3f55f6869c6d0c74d9').hide();
             //$scope.getUserPledges();
         });
     };

     $scope.changeUserStatus = function(uname, status) {
         $http.post('/changeUserStatus', { uname: uname, status: status }).success(function(resp) {
             //console.log(resp);
             //$('#obj5733ca3f55f6869c6d0c74d9').hide();
             //$scope.getUserPledges();
         });
     };

     $scope.runInitPayOut = function(uid) {
         $scope.changePledgeActivity(uid, "served");

         if ($scope.currentPayee.level == 1) {
             msgToPayee = "ACS-MOOLAR: \n You are about to receive a sum of E 2500.00,\n please use only E 1000.00, you will get instructions shortly \n on where to send the E 1500.00 \n You will be in-line to receive E 7500.00 \n we trust in you not to be greedy, \n Regards.";
             $scope.sendSMS($scope.currentPayee.contact.substring(1), msgToPayee);
         } else if ($scope.currentPayee.level == 2) {
             msgToPayee = "ACS-MOOLAR: \n You are about to receive a sum of E 7500.00,\n please use only E 6000.00, you will get instructions shortly \n on where to send the E 1500.00 \n You will be in-line to receive E 2500.00 \n we trust in you not to be greedy, \n Regards.";
             $scope.sendSMS($scope.currentPayee.contact.substring(1), msgToPayee);
         }
         userCounter = 0;
         $scope.top5users.forEach(function(user) {
             theamt = 0;
             if (user.level == 0) {
                 theamt = 500;
             } else if (user.level == 1) {
                 theamt = 1500;
             } else if (user.level == 2) {
                 theamt = 1500;
             } else if (user.level == 3) {
                 theamt = 8000;
             } else if (user.level == 4) {
                 theamt = 10000;
             }
             msgToUser = "ACS-MOOLAR: \n Please deposit E " + theamt + ".00 to: " + $scope.currentPayee.fname + " " + $scope.currentPayee.lname + " \n Acc: " + $scope.currentPayee.acc + " \n " + $scope.currentPayee.accholder + " \n contact number: " + $scope.currentPayee.contact + " \n Login to the system \n after payment and confirm it \n under Due Payments, then contact the Payee to confirm as well under Payouts. \n You have 24 hours to complete this request. Thank you!";
             theHttpCall = 'http://api.clickatell.com/http/sendmsg?user=SECCRMSMS&password=SqjJf4sd&api_id=3602185&to=' + user.contact.substring(1) + '&text=' + msgToUser;

             $scope.sendSMS(user.contact.substring(1), msgToUser);
             //console.log(theHttpCall);
             $scope.changePledgeActivity(user._id, "inline");
             defaultPledge = {
                 "fname": user.fname,
                 "lname": user.lname,
                 "contact": user.contact,
                 "country": user.country,
                 "bank": user.bank,
                 "acc": user.acc,
                 "accholder": user.accholder,
                 "activity": "active",
                 "amount": user.amount,
                 "level": user.level,
                 "daymonth": "0",
                 "uname": user.uname,
                 "proxyToServe": uid,
                 "servingProxy": user._id,
                 "userToServe": $scope.currentPayee.uname,
                 "accToServe": $scope.currentPayee.acc,
                 "accholderToServe": $scope.currentPayee.accholder,
                 "contactToServe": $scope.currentPayee.contact
             };

             //console.log(defaultPledge);
             $http.post('/route5733d165d8d777276e976db2', defaultPledge).success(function(resp) {
                 //console.log('the response:');
                 //console.log(resp);
                 //$scope.getUserPledges();
                 //$scope.getPayStackRoot();
             });

             $scope.changeUserStatus(user.uname, false);
             $scope.getNewUsers();
             $scope.getInlineL1();

             userCounter++
             if (userCounter >= 5) {
                 $scope.top5users = [];
             }
         });
     };

     $scope.updateNumPays = function(proxyId) {
         $http.post('/updateNumPays', { proxyId: proxyId }).success(function(resp) {
             console.log(resp);
             //$('#obj5733ca3f55f6869c6d0c74d9').hide();
             //$scope.getUserPledges();
         });
     };

     $scope.removeProxy = function(proxyId) {
         $http.post('/removeProxy', { proxyId: proxyId }).success(function(resp) {
             //console.log(resp);
             //$('#obj5733ca3f55f6869c6d0c74d9').hide();
             //$scope.getUserPledges();
         });
     };

     $scope.moveToStack = function(instr) {
         $scope.changePledgeActivity(instr.servingProxy, "inline");

         $scope.updateNumPays(instr.proxyToServe);
         theServingProxy = instr.servingProxy;

         //The message to serving proxy
         if (instr.level == 0) {
             serverMsg = "ACS-MOOLAR: \n Thank you for your payment and cooperation, \n You are now in level 1 \n and in-line to receive E 2500.00,\n Please follow instructions on the next SMSs \n Regards.";
             $scope.sendSMS(instr.contact.substring(1), serverMsg);
         } else if (instr.level == 1) {
             serverMsg = "ACS-MOOLAR: \n Thank you for your payment and cooperation, \n You are now in level 2 \n and in-line to receive E 7500.00,\n Please follow instructions on the next SMSs \n Regards.";
             $scope.sendSMS(instr.contact.substring(1), serverMsg);
         } else if (instr.level == 2) {
             serverMsg = "ACS-MOOLAR: \n Thank you for your payment and cooperation, \n You are now in level 1 \n and in-line to receive E 2500.00,\n Please follow instructions on the next SMSs \n Regards.";
             $scope.sendSMS(instr.contact.substring(1), serverMsg);
         }
         //console.log(instr);
         delete instr._id;
         delete instr.proxyToServe;
         delete instr.servingProxy;
         delete instr.accToServe;
         delete instr.accholderToServe;
         delete instr.contactToServe;
         instr.level++;
         instr['numPays'] = 0;
         instr['activity'] = 'inline';
         //instr['amount'] = 300;

         if (instr.level == 1) {
             instr['amount'] = 500;
         } else if (instr.level == 2) {
             instr['amount'] = 1500;
         } else if (instr.level == 3) {
             instr['amount'] = 8000;
         }
         //console.log(instr);

         $http.post('/moveToStack', instr).success(function(resp) {
             //console.log(resp);
             if (instr.uname != 'root') {
                 $scope.removeProxy(theServingProxy);
             }
         });
     };

     $scope.moveToIncompleteStack = function(instr) {
         console.log(instr);
         $http.post('/moveToIncompleteStack', instr).success(function(resp) {
             console.log(resp);
         });
     };

 }]);
