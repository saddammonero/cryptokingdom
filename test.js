var CryptoKingdom = require('./lib/cryptokingdom'),
    username = 'YOUR USERNAME',
    password = 'YOUR PASSWORD',
    deviceID = 'YOUR DEVICE ID', //an arbitrary number
    ck = new CryptoKingdom(username, password, deviceID);


//example of place ask order
ck.sell('W1601', 1, 1000000, function(err, response){
    if(err){
        console.log(err);
    }
    console.log(response);
});

//example of get state for item
ck.getStateForItem('W1601', function(err, response){
    if(err){
        console.log(err);
    }
    console.log(response.data);
});