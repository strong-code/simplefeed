window.SimpleFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var $menu = $("#menu");
    var feeds = new SimpleFeed.Collections.Feeds();
    var feedsIndexView = new SimpleFeed.Views.FeedsIndex({collection: feeds, el: $menu});

    feeds.fetch({
      success: function() {
        feedsIndexView.render();
        new SimpleFeed.Routers.Router(feeds, $rootEl, $menu);
        Backbone.history.start();
      },
      error: function() {
        console.log("Failed initial fetching of feeds from server!");
      }
    });
  }
};

$(document).ready(function(){
  SimpleFeed.initialize();
});
