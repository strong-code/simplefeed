SimpleFeed.Collections.Feeds = Backbone.Collection.extend({
  model: SimpleFeed.Models.Feed,
  url: '/feeds',
  comparator: function(feed) {
    return -feed.get('updated_at');
  }
});