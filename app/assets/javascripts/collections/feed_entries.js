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
  },

  findInTitles: function(searchString) {
    var keywords = searchString.split(" ");
    var results = [];
    this.each(function(entry) {
      for (var i=0;i<keywords.length;i++) {
        if (entry.get('title').toLowerCase().indexOf(keywords[i].toLowerCase()) != -1) {
          results.push(entry);
        }
      }
    });
    return results;
  }
});