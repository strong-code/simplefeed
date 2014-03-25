SimpleFeed.Collections.FeedEntries = Backbone.Collection.extend({
  model: SimpleFeed.Models.Entry,

  initialize: function(models, options) {
    this.feed = options.feed;
  },

  comparator: function(entry) {
    return -Date.parse(entry.get('pubdate'));
  },

  url: function() {
    return '/feeds/' + this.feed.id + "/entries";
  }
});