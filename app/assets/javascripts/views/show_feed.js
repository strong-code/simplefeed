SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {

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
    $(e.currentTarget).toggleClass('feed-entry-bar-selected');
    //this is necessary to work for edge cases on wonky RSS feeds
    $(e.currentTarget.children[2]).toggleClass('feed-entry-hidden');
    var derf = $(e.currentTarget.children[1]).text();
    $(e.currentTarget.children[2].children[0]).html(derf);
  }
});