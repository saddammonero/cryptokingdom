var CryptoKingdom = require('cryptokingdom'),
    username = 'YOUR USERNAME',
    password = 'YOUR PASSWORD',
    deviceID = 'YOUR DEVICE ID', //an arbitrary number
    ck = new CryptoKingdom(username, password, deviceID);

//example of get state for item
ck.getStateForItem('W1601', function(err, response){
    if(err){
        console.log(err);
    }
    console.log(response.data);
});