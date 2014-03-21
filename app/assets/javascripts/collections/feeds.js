SimpleFeed.Collections.Feeds = Backbone.Collection.extend({
  model: SimpleFeed.Models.Feed,
  url: '/feeds'
});