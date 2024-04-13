import extend from "./extend";
import ClientMethods from "./client-methods";

export default Memory;

function Memory(client, actor) {
  this.initialize(client, actor);
}

Memory.prototype = extend(ClientMethods, {
  measure: function(cb) {
    this.request('measure', function (err, resp) {
      cb(err, resp);
    });
  }
})
