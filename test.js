var CryptoKingdom = require('./lib/cryptokingdom'),
    username = 'username',
    password = 'PASSWORD',
    deviceID = 'test', //an arbitrary id
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

ck.itemOwnership(token, item, function(err, data){
    console.log(data);
});


