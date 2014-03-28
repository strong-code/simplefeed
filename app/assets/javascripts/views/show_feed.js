SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {
    this.listenTo(this.model.entries(), "add", this.render);
  },

  events: {
    "click .feed-entry-bar" : "showOrHideEntry",
    "keyup #entry-search-box" : "searchTitles",
    "click #reset-feed" : "resetFeedEntries",
    "click span#feed-title" : "resetFeedEntries",
    "click #mark-all-read" : "markAllAsRead"
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
    // Grab the content as string, inject back into unhidden elem
    // and color the text black for readability
    $(e.currentTarget.children[2]).toggleClass('feed-entry-hidden');
    var derf = $(e.currentTarget.children[1]).text();
    $injectable = $(e.currentTarget.children[2].children[0]);
    $injectable.html(derf);
    $injectable.css('color', 'black');
  },

  //need to supress the save emit
  markEntryAsRead: function(e) {
    var entryCollection = this.model.entries();
    var entry = entryCollection.get($(e.currentTarget).data('id'));
    entry.set('read', 'true');
    entry.save();
    $entryCount = $('.feed-'+entry.get('feed_id')+'-unread-entry-count');
    $entryCount.text(parseInt($entryCount.text()) - 1);
  },

  searchTitles: function(e) {
    e.preventDefault();
    if (e.keyCode == 13 && !this.entryCache) {
      this.entryCache = this.model.get('entries').slice(0);
      var searchTerm = $('#entry-search-box').val();
      var results = this.model.entries().findInTitles(searchTerm);
      this.model.entries().set(results, {add: false})
      this.render();
    }
  },

  resetFeedEntries: function() {
    if (this.entryCache) {
      this.model.entries().reset(this.entryCache);
      this.render();
      this.entryCache = null;
    }
  },

  markAllAsRead: function(e) {
    if (result = window.confirm('Are you SURE you want to mark all entries as read?')) {
      var entryId = $(e.currentTarget).data('id');
      $('.feed-'+entryId+'-unread-entry-count').text("0");
      this.model.entries().each(function(entry) {
        entry.set({'read' : true});
        entry.save();
      });
    }
    this.render();
  }
});