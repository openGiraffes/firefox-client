var extend = require("./extend"),
    ClientMethods = require("./client-methods"),
    Node = require("./domnode");

module.exports = Styles;

function Styles(client, actor) {
  this.initialize(client, actor);
  this.walker = null;
}

Styles.prototype = extend(ClientMethods, {

  getApplied: function(node, options, cb) {

    var params = {
      node: node,
      options: options
    };

    this.pageStyleRequest("getApplied", params, function(err, resp) {

      if (err) {
        return cb(err);
      }

      cb(null, resp);

    }.bind(this));
  },

  getComputed: function(node, options, cb) {

    var params = {
      node: node,
      options: options
    };

    this.pageStyleRequest("getComputed", params, function(err, resp) {

      if (err) {
        return cb(err);
      }

      cb(null, resp.computed);

    }.bind(this));
  },

  getMatchedSelectors: function(node, property, options, cb) {

    var params = {
      node: node,
      property: property,
      options: options
    };

    this.pageStyleRequest("getMatchedSelectors", params, function(err, resp) {
      if (err) {
        return cb(err);
      }

      cb(null, resp);

    }.bind(this));
  },

  pageStyleRequest: function(type, message, cb) {
    this.getPageStyle(function(err, pageStyle) {
      pageStyle.request(type, message, cb);
    });
  },

  getPageStyle: function(cb) {
    if (this.pageStyle) {
      return cb(null, this.pageStyle);
    }

    this.request('getPageStyle', function(err, resp) {
      this.pageStyle = new PageStyle(this.client, resp.pageStyle);
      cb(err, this.pageStyle);
    }.bind(this));
  }

});

function PageStyle(client, pageStyle) {
  this.pageStyle = pageStyle;
  this.initialize(client, this.pageStyle.actor);
}

PageStyle.prototype = extend(ClientMethods, {});
