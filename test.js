'use strict';
var CryptoKingdom = require('./lib/cryptokingdom'),
    username = 'username',
    password = 'password',
    deviceID = 'test-api', //an arbitrary id
    ck = new CryptoKingdom(username, password, deviceID);

//ck.consume('can', 1, 'test', function(err, res) {
//    if(err){
//        console.log(err);
//    } else {
//        console.log(res);
//    }
//});

//ck.getToken(ck, function(err, token){
//    console.log(token);
//});
// ck.getToken(ck, function(err, token) {
//     console.log(token);
// })

// ck.owns(token, item, function(err, data) {
//     console.log(data);
// })

ck.give(token, 'CAN', 1, {name: 'Riddick', note: 'yum'}, function(err, data){
    console.log(data);
})

