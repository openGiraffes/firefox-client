var extend = require("./extend"),
    ClientMethods = require("./client-methods");

function GCLI(client, actor) {
  this.initialize(client, actor);
}

GCLI.prototype = extend(ClientMethods, {

  specs : function(cb) {
    this.request('specs', function(resp) {
      console.log('resp', resp);
      return resp;
    }.bind(this), cb);
  }
})

module.exports = GCLI
