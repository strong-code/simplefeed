SimpleFeed.Model.Feed = Backbone.Model.extend({
  initialize: function() {
    this.entries();
  },

  parse: function() {
    if (response["entries"]) {
      this.entries().set(response["entries"]);
      delete response["entries"];
    }
    return response;
  }

  // entries: function() {
  //   if (!this.get('entries')) {
  //     var feedEntries = new SimpleFeed.Collections.FeedEntries([], {
  //       feed: this
  //     });
  //     this.set({
  //       entries: f
  //     })
  //   }
  // }
})