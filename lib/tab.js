import extend from "./extend";
import ClientMethods from "./client-methods";
import Console from "./console";
import Device from "./device";
import Memory from "./memory";
import DOM from "./dom";
import Network from "./network";
import StyleSheets from "./stylesheets";
import Styles from "./styles";

export default Tab;

function Tab(client, tab) {
  this.initialize(client, tab.actor);

  this.tab = tab;

  this.updateInfo(tab);

  this.on("tabNavigated", this.onTabNavigated.bind(this));
}

Tab.prototype = extend(ClientMethods, {
  updateInfo: function(form) {
    this.url = form.url;
    this.title = form.title;
  },

  get StyleSheets() {
    if (!this._StyleSheets) {
      this._StyleSheets = new StyleSheets(this.client, this.tab.styleSheetsActor);
    }
    return this._StyleSheets;
  },

  get Device() {
    if (!this._Device) {
      this._Device = new Device(this.client, this.client.deviceActor);
    }
    return this._Device;
  },

  get DOM() {
    if (!this._DOM) {
      this._DOM = new DOM(this.client, this.tab.inspectorActor);
    }
    return this._DOM;
  },

  get Styles() {
    if (!this._Styles) {
      this._Styles = new Styles(this.client, this.tab.inspectorActor);
    }
    return this._Styles;
  },

  get Network() {
    if (!this._Network) {
      this._Network = new Network(this.client, this.tab.consoleActor);
    }
    return this._Network;
  },

  get Console() {
    if (!this._Console) {
      this._Console = new Console(this.client, this.tab.consoleActor);
    }
    return this._Console;
  },

  get Memory() {
    if (!this._Memory) {
      this._Memory = new Memory(this.client, this.tab.memoryActor);
    }
    return this._Memory;
  },

  onTabNavigated: function(event) {
    if (event.state == "start") {
      this.emit("before-navigate", { url: event.url });
    }
    else if (event.state == "stop") {
      this.updateInfo(event);

      this.emit("navigate", { url: event.url, title: event.title });
    }
  },

  attach: function(cb) {
    this.request("attach", cb);
  },

  detach: function(cb) {
    this.request("detach", cb);
  },

  reload: function(cb) {
    this.request("reload", cb);
  },

  navigateTo: function(url, cb) {
    this.request("navigateTo", { url: url }, cb);
  }
})
