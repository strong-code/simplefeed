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
      description: response['description'],
      title: response['title'],
      user_id: response['user_id'],
      pubdate: response['pubdate'] || response['created_at'],
      updated: response['updated_at'],
      unread: response['get_unread_entry_count']
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