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
    $(e.currentTarget.children[1]).toggleClass('feed-description-brief');
    $(e.currentTarget.children[1]).toggleClass('feed-entry-hidden');
    //$(e.currentTarget.children[1]).toggleClass('feed-description-brief');
    var derf = $(e.currentTarget.children[1]).text()
    $(e.currentTarget.children[1]).html(derf)
  }
});