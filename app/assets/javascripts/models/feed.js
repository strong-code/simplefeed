SimpleFeed.Models.Feed = Backbone.Model.extend({
  initialize: function() {
    this.entries();
  },

  // url: function() {
  //   return "/feeds/"+this.id
  // },

  parse: function(response) {
    if (response['entries']) {
      this.entries().set(response['entries']);
      delete response['entries'];
    }
    this.set({
      id: response['id'],
      url: response['url'],
      description: response['content_encoded'] || response['description'],
      title: response['title'],
      user_id: response['user_id'],
      pubdate: response['pubdate'],
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