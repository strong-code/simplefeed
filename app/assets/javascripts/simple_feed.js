window.SimpleFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var $menu = $("#menu");
    var feeds = new SimpleFeed.Collections.Feeds();
    var currentUser = new SimpleFeed.Models.User();
    var feedsIndexView;

    currentUser.fetch({
      success: function() {
        feedsIndexView = new SimpleFeed.Views.FeedsIndex({
          collection: feeds,
          user: currentUser
        });
      }
    });

    feeds.fetch({
      success: function() {
        $menu.html(feedsIndexView.render().$el);
        new SimpleFeed.Routers.Router(currentUser, feeds, $rootEl, $menu);
        Backbone.history.start();
      },
      error: function() {
        console.log("Failed to fetch user");
      }
    });

  }
};

$(document).ready(function(){
  SimpleFeed.initialize();
});
