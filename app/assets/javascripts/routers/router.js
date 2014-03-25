SimpleFeed.Routers.Router = Backbone.Router.extend({
  initialize: function(feeds, $content, $menu) {
    this.feeds = feeds;
    this.$content = $content;
    this.$menu = $menu;
  },

  routes: {
    "" : "index",
    "feeds/:id" : "showFeed"
  },

  index: function() {
    this.$content.html('');
  },

  showFeed: function(id) {
    var feed = this.feeds.get(id);
    var feedShowView = new SimpleFeed.Views.ShowFeed({
      model: feed
    });
    this._swapView(feedShowView);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$content.html(view.render().$el);
  }
})