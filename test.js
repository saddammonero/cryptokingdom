var CryptoKingdom = require('./lib/cryptokingdom'),
    username = 'Riddick',
    password = 'dO`j9n~TXr4P',
    deviceID = '2', //an arbitrary number
    ck = new CryptoKingdom(username, password, deviceID);

//example of get state for item
//ck.create('MEAD', 1, 57, function(err, response){
//    if(err){
//        console.log(err);
//    }
//    console.log(response.data);
//});

ck.itemOwnership(function(err, data){
    if(err){
        console.log(err);
    } else {
        console.log(data);
    }
});

//ck.consume('can', 1, 'test', function(err, res) {
//    if(err){
//        console.log(err);
//    } else {
//        console.log(res);
//    }
//});

