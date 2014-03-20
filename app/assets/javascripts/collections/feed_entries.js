SimpleFeed.Collections.FeedEntries = Backbone.Collection.extend({
  model: SimpleFeed.Model.Entry,

  initialize: function(models, options) {
    this.feed = option.feed;
  }
 })