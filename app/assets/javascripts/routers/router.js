SimpleFeed.Routers.Router = Backbone.Router.extend({
  initialize: function(user, feeds, $rootEl, $menu) {
    this.user = user;
    this.feeds = feeds;
    this.$rootEl = $rootEl;
    this.$menu = $menu;
  },

  routes: {
    "" : "index"
  },

  index: function() {
    this.$rootEl.html('');
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
})