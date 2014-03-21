window.SimpleFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var $menu = $("#menu");
    var feeds = new SimpleFeed.Collections.Feeds();
    feeds.fetch({
      success: function() {
        new SimpleFeed.Routers.Router(feeds, $rootEl, $menu);
        Backbone.history.start();
      },
      error: function() {
        console.log("Failed to fetch feeds");
      }
    })
  }
};

$(document).ready(function(){
  SimpleFeed.initialize();
});
