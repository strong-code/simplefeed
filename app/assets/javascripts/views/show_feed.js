SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {
    this.listenTo(this.model.entries(), "add", this.render);
  },

  events: {
    "click .feed-entry-bar" : "showOrHideEntry"
  },

  render: function() {
    var renderedContent = this.template({
      feed: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showOrHideEntry: function(e) {
    $elem = $(e.currentTarget);
    $elem.toggleClass('feed-entry-bar-selected');
    if (!$elem.hasClass('entry-read')) {
      $elem.toggleClass('entry-read');
      this.markEntryAsRead(e);
    }
    //this is necessary to work for edge cases on wonky RSS feeds
    $(e.currentTarget.children[2]).toggleClass('feed-entry-hidden');
    var derf = $(e.currentTarget.children[1]).text();
    $(e.currentTarget.children[2].children[0]).html(derf);
  },

  markEntryAsRead: function(e) {
    var entryCollection = this.model.entries();
    var entry = entryCollection.get($(e.currentTarget).data('id'));
    entry.set('read', 'true');
    entry.save();
    $entryCount = $('.feed-'+entry.get('feed_id')+'-unread-entry-count');
    $entryCount.text(parseInt($entryCount.text()) - 1);
  }
});