import extend from "./extend";
import ClientMethods from "./client-methods";

function Device(client, actor) {
  this.initialize(client, actor);
}

Device.prototype = extend(ClientMethods, {

  screenshotToDataURL : function(cb) {
    this.request('screenshotToDataURL', function(resp) {
      return resp.value.initial;
    }.bind(this), cb);
  },

  getDescription: function(cb) {
    this.request('getDescription', function(resp) {
      return resp
    }.bind(this), cb);
  }

})

export default Device
