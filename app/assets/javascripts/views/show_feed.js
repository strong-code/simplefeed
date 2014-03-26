SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {
    this.listenTo(this.model.entries(), "add", this.render);
  },

  events: {
    "click .feed-entry-bar" : function(e) {
      this.showOrHideEntry(e);
      this.markEntryAsRead(e);
    },
  },

  render: function() {
    var renderedContent = this.template({
      feed: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showOrHideEntry: function(e) {
    $(e.currentTarget).toggleClass('feed-entry-bar-selected');
    //this is necessary to work for edge cases on wonky RSS feeds
    $(e.currentTarget.children[2]).toggleClass('feed-entry-hidden');
    var derf = $(e.currentTarget.children[1]).text();
    $(e.currentTarget.children[2].children[0]).html(derf);
  },

  markEntryAsRead: function(e) {
    var entryCollection = this.model.entries();
    var entry = entryCollection.get($(e.currentTarget).data('id'));

  }
});