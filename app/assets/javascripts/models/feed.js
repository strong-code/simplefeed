SimpleFeed.Models.Feed = Backbone.Model.extend({
  initialize: function() {
    this.entries();
  },

  parse: function(response) {
    if (response['entries']) {
      this.entries().set(response['entries']);
      delete response['entries'];
    }
    this.set({
      id: response['id'],
      url: response['url'],
      title: response['title'],
      user_id: response['user_id']
    });
    return response['entries'];
  },

  entries: function() {
    if (!this.get("entries")) {
      var feedEntries = new SimpleFeed.Collections.FeedEntries([], {
        feed: this
      });
      this.set({
        entries: feedEntries
      });
    }
    return this.get("entries");
  }
});