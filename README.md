# cryptokingdom.js
A Node.js client for the [CryptoKingdom][cryptokingdom] API.

This client supports public and private calls to the Agora Marketplace for trading on [CryptoKingdom][cryptokingdom].

GitHub repository: [github.com/saddammonero/cryptokingdom][repo]

## License
ISC, open source. See LICENSE file.

## install via NPM
    npm install cryptokingdom
    
## or install via Github
    git clone https://github.com/saddammonero/cryptokingdom.git
    cd cryptokingdom
    npm install
    
## or download the latest zip
*   [zip download][repo-zip]

## Require the module
    var CryptoKingdom = require('cryptokingdom');
If not installed via NPM, provide the path to lib/cryptokingdom.js

## Create an instance of the client
    var ck = new CryptoKingdom('USERNAME', 'PASSWORD', 'DEVICE_ID');
    
## Make API calls
Supported API methods: buy, sell, cancelBid, cancelAsk, cancelAll, give, consume, getStateForItem. 
All methods require a callback function.
The callback is passed two arguments: an error object (null if successful), and a data object (the response from the API).
    
## Public API methods

These methods do not require user authentication.

### getStateForItem(item, callback)
Returns the current order book for a given item.

    ck.getStateForItem('W1604', function(err, data){
        if (err){
            //handle error
        }
        console.log(data);
    });

Example response: 

    { asks: [ { id: '2557', itemID: 'w1604', price: '200000', amount: '5', shortName: 'saddam'} ],
    bids: [ { price: '80000', amount: '100', shortName: 'binaryFate' },
               { price: '30000', amount: '50', shortName: 'Zechariah' } ] }
    
## Private API methods

These methods require username, password, and deviceID for user authentication.

### buy(item, quantity, price, callback)
Places a bid order for a given item.

    ck.buy('W1601', 1, 10000, function(err, response){
        if(err){
            //handle error
        }
        console.log(response);
    });

Example response:

    { status: 200,
      error: false,
      data: { result: 'New bid added for 1 units of W1601 at a limit price of 10000.' } }
      
### sell(item, quantity, price, callback)
Places an ask order for a given item.
    
    ck.sell('W1601', 1, 250000, function(err, response){
            if(err){
                //handle error
            }
            console.log(response);
        });
        
Example response:

    { status: 200,
      error: false,
      data: { result: 'New ask added for 1 units of W1601 at a limit price of 250000.' } }
      
### cancelAll(item, callback)
Cancels all ask and bid orders for a given item.

    ck.cancelAll('W1601', function(err, response){
        if(err){
            //handle error
        }
        console.log(response);
    });

Example response:
    
    { status: 200,
      error: false,
      data: { result: 'Your asks and bids are cancelled' } }
      
### cancelBid(item, amount, price, callback)
Cancels a specified bid order.

    ck.cancelBid('W1601', 1, 10000, function(err, response){
        if(err){
            console.log(err);
        }
        console.log(response);
    });
    
Example response:
    
    { status: 200, error: false, data: { result: 'Order removed.' } }

### cancelAsk(item, amount, price, callback)
Cancels a specified ask order.
    
    ck.cancelAsk('W1601', 1, 300000, function(err, response){
        if(err){
            console.log(err);
        }
        console.log(response);
    });

Example response:
    
    { status: 200, error: false, data: { result: 'Order removed.' } }

### give(item, amount, recipient, callback)
Give an item to another player. Recipient can be specified as ID or username.

    ck.give('W1601', 1, 57, function(err, response){
        if(err){
            console.log(err);
        }
        console.log(response);
    });
OR:
    
    ck.give('W1601', 1, 'Riddick', function(err, response){
        if(err){
            console.log(err);
        }
        console.log(response);
    });

Example response:

    { status: 200,
      error: false,
      data: { result: '1 units of W1601 given to Riddick.' } }

### consume(item, amount, callback)
Consume an item. Item must be consumable.

    ck.consume('W1604', 1, function(err, response){
        if(err){
            console.log(err);
        }
        console.log(response);
    });
    
Example response:
    
    { status: 200,
      error: false,
      data: { result: '1 units of W1604 consumed.' } }

    






[cryptokingdom]: https://cryptokingdom.me
[repo]: https://github.com/saddammonero/cryptokingdom
[repo-zip]: https://github.com/saddammonero/cryptokingdom/archive/master.zip
