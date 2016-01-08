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
                cb(err, body);
            });
            return this;
        },

        //public API request
        public: function(item, cb){
            var options = {
                method: 'GET',
                url: URL + 'getStateForItem/' + item,
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
        buy: function(item, quantity, price, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'buy',
                        itemID: item,
                        price: price,
                        amount: quantity
                    };
                    return self.private(params, cb);
                }
            })
        },

        //place sell order (ask)
        sell: function(item, quantity, price, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'sell',
                        itemID: item,
                        price: price,
                        amount: quantity
                    };
                    return self.private(params, cb);
                }
            })
        },

        //cancel ALL orders for a certain item
        cancelAll: function(item, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'cancelall',
                        itemID: item
                    };
                    return self.private(params, cb);
                }
            })
        },

        cancelBid: function(item, amount, price, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'cancelbid',
                        itemID: item,
                        amount: amount,
                        price: price
                    };
                    return self.private(params, cb);
                }
            })
        },

        cancelAsk: function(item, amount, price, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'cancelask',
                        itemID: item,
                        amount: amount,
                        price: price
                    };
                    return self.private(params, cb);
                }
            })
        },

        give: function(item, amount, recipient, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'give',
                        itemID: item,
                        amount: amount,
                        characterID: recipient
                    };
                    return self.private(params, cb);
                }
            })
        },

        consume: function(item, amount, note, cb){
            var self = this;
            self.getToken(self, function(err,response){
                if(err) {
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'consume',
                        itemID: item,
                        amount: amount,
                        note: note
                    };
                    return self.private(params, cb);
                }
            })
        },

        create: function(item, amount, recipient, note, cb){
            var self = this;
            self.getToken(self, function(err, response){
                if(err){
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'create',
                        itemID: item,
                        amount: amount,
                        characterID: recipient,
                        note: note
                    };
                    return self.private(params, cb);
                }
            })
        },

        transfer: function(item, amount, source, recipient, cb){
            var self = this;
            self.getToken(self, function(err, response){
                if(err){
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        command: 'transfer',
                        itemID: item,
                        amount: amount,
                        transferFrom: source,
                        transferTo: recipient
                    };
                    return self.private(params, cb);
                }
            })
        },

        itemOwnership: function(cb) {
            var self = this;
            self.getToken(self, function(err, response){
                if(err){
                    console.log(err);
                } else {
                    var params = {
                        token: response.data.token,
                        total: 'ckg'
                    };
                    return self.private(params, cb);
                }
            })
        }

};

module.exports = CryptoKingdom;