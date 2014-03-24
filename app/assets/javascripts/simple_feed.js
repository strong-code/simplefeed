window.SimpleFeed = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#content");
    var $menu = $("#menu");
    var feeds = new SimpleFeed.Collections.Feeds();
    var user = new SimpleFeed.Models.User();
    var feedsIndexView = new SimpleFeed.Views.FeedsIndex({collection: feeds, user: user});

    //AHAHAH IM DOING THIS AND YOU CAN'T TELL ME NO
    user.fetch({
      success: function() {
        feeds.fetch({
          success: function() {
            $menu.html(feedsIndexView.render().$el);
            new SimpleFeed.Routers.Router(user, feeds, $rootEl, $menu);
            Backbone.history.start();
          },
          error: function() {
            console.log("Failed initial fetching of feeds from server!");
          }
        });
      }
    });
  }
};

$(document).ready(function(){
  SimpleFeed.initialize();
});
