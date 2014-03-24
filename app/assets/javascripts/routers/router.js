SimpleFeed.Routers.Router = Backbone.Router.extend({
  initialize: function(feeds, $rootEl, $menu) {
    this.feeds = feeds;
    this.$rootEl = $rootEl;
    this.$menu = $menu;
  },

  routes: {
    "" : "index",
    "/feed/:id" : "showFeed"
  },

  index: function() {
    this.$rootEl.html('');
  },

  showFeed: function(id) {
    debugger
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})