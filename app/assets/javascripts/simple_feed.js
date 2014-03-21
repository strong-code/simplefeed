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
        //grab user_id from a feed we just got, use that to construct current user model
        var currentUser = new SimpleFeed.Models.User(feeds.first().get('user_id'));
        var feedsIndexView = new SimpleFeed.Views.FeedsIndex({
          collection: feeds,
          user: currentUser
        });
        $menu.html(feedsIndexView.render().$el);
        new SimpleFeed.Routers.Router(currentUser, feeds, $rootEl, $menu);
        Backbone.history.start();
      },
      error: function() {
        console.log("Failed to fetch user");
      }
    })
  }
};

$(document).ready(function(){
  SimpleFeed.initialize();
});
