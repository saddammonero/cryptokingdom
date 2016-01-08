var CryptoKingdom = require('./lib/cryptokingdom'),
    username = 'USERNAME',
    password = 'PASSWORD',
    deviceID = '2', //an arbitrary number
    ck = new CryptoKingdom(username, password, deviceID);

ck.consume('can', 1, 'test', function(err, res) {
    if(err){
        console.log(err);
    } else {
        console.log(res);
    }
});

