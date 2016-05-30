//constants
var URL = 'https://cryptokingdom.me/api/';

//dependencies
var request = require('request');

//Constructor
function CryptoKingdom(username, password, deviceID){
        this.username = username,
        this.password = password,
        this.deviceID = deviceID
}


CryptoKingdom.prototype = {
    constructor: CryptoKingdom,

    //general API request
    request: function(options, cb){
        if(!('headers' in options)){
            options.headers = {};
        }
        options.headers['content-type'] = 'application/json';
        options.json = true;
        request(options, function(err, response, body){
            if(options.body && options.body.command == 'owns') {
                cb(err, transformOwns(body));
            } else {
                cb(err, body);
            }
        });
        return this;
    },

    //public API request
    public: function(item, cb){
        var options = {
            method: 'GET',
            url: URL + 'getStateForItem/' + item
        };
        return this.request(options, cb);
    },

    //private API request
    private: function(params, cb){
        var options = {
            method: 'POST',
            url: URL + 'post-command',
            body: params
        };
        if(!params.command){
            options.url = URL + 'itemOwnership';
        }
        return this.request(options, cb);
    },

    //PUBLIC METHODS

    getStateForItem: function(item, cb){
        return this.public(item, cb);
    },

    //PRIVATE METHODS

    //login to receive token
    getToken: function(params, cb){
        var options = {
            method: 'POST',
            url: URL + 'login',
            body: params
        };
        options.body.jsonrpc = '2.0';
        options.body.id = '0';
        return this.request(options, cb);
    },

    //place buy order (bid)
    buy: function(token, item, quantity, price, cb){
        var params = {
            token: token,
            command: 'buy',
            itemID: item,
            price: price,
            amount: quantity
        };
        return this.private(params, cb);
    },

    //place sell order (ask)
    sell: function(token, item, quantity, price, cb){
        var params = {
            token: token,
            command: 'sell',
            itemID: item,
            price: price,
            amount: quantity
        };
        return this.private(params, cb);
    },

    //cancel ALL orders for a certain item
    cancelAll: function(token, item, cb){
        var params = {
            token: token,
            command: 'cancelall',
            itemID: item
        };
        return this.private(params, cb);
    },

    cancelBid: function(token, item, amount, price, cb){
        var params = {
            token: token,
            command: 'cancelbid',
            itemID: item,
            amount: amount,
            price: price
        };
        return this.private(params, cb);
    },

    cancelAsk: function(token, item, amount, price, cb){
        var params = {
            token: token,
            command: 'cancelask',
            itemID: item,
            amount: amount,
            price: price
        };
        return this.private(params, cb);
    },

    give: function(token, item, amount, recipient, cb){
        var params = {
            token: token,
            command: 'give',
            itemID: item,
            amount: amount,
            characterID: recipient.name
        };
        recipient.note ? params.note = recipient.note : params.note = null;
        return this.private(params, cb);
    },

    consume: function(token, item, amount, note, cb){
        var params = {
            token: token,
            command: 'consume',
            itemID: item,
            amount: amount,
            note: note
        };
        return this.private(params, cb);
    },

    create: function(token, item, amount, recipient, note, cb){
        var params = {
            token: token,
            command: 'create',
            itemID: item,
            amount: amount,
            characterID: recipient,
            note: note
        };
        return this.private(params, cb);
    },

    transfer: function(token, item, amount, source, recipient, cb){
        var params = {
            token: token,
            command: 'transfer',
            itemID: item,
            amount: amount,
            transferFrom: source,
            transferTo: recipient
        };
        return this.private(params, cb);
    },
    
    // Returns a list of all items owned by the character
    itemOwnership: function(token, item, cb) {
        var params = {
            token: token,
            itemID: item
        };
        return this.private(params, cb);
    },
    
    owns: function(token, item, cb) {
        var params = {
            token: token,
            command: 'owns',
            itemID: item
        };
        return this.private(params, cb);
    }

};

module.exports = CryptoKingdom;

// helper function for parsing HTML and sorting player owns list
function transformOwns(data){
    if(typeof data == 'object') {
        return data.data.result;
    } else {
        let owns = data.split('<br>');
        let filtered = owns.filter(function(item){
            if(item.startsWith('<strong>')){
                return item;
            }
        });
        let arr = filtered.map(function(item) {
            let player = {};
            let temp = item.split('<strong>');
            temp.shift();
            let data = temp[0].split('<STRONG>');
            data[1] = data[1].split(':').pop().trim();
            player.name = data[0];
            player.balance = parseFloat(data[1].replace(/,/g, ''));
            return player;
        });

        let list = arr.sort(function(a, b) {
            if(a.balance < b.balance){
                return 1;
            }
            if(a.balance > b.balance){
                return -1;
            }
            return 0;
        });
        
        return list;    
    }
    
}
