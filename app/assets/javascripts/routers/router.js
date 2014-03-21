SimpleFeed.Routers.Router = Backbone.Router.extend({
  initialize: function(feeds, $rootEl, $menu) {
    this.feeds = feeds;
    this.$rootEl = $rootEl;
    this.$menu = $menu;
  },

  routes: {
    "" : "index"
  },

  index: function() {
    alert("got here");
  }
})