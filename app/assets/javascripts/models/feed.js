SimpleFeed.Models.Feed = Backbone.Model.extend({
  initialize: function() {
    this.entries();
  },

  entries: function() {
    if (response["entries"]) {
      var feedEntries = new SimpleReader.Collections.FeedEntries([], {
        feed: this
      });
      this.set({
        entries: feedEntries
      });
    }
    return this.get("entries");
  }
});