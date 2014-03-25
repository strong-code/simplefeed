SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {

  },

  events: {
    "click .feed-entry-bar" : "showEntry"
  },

  render: function() {
    var renderedContent = this.template({
      feed: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showEntry: function(e) {
    $(e.currentTarget.children[1]).toggleClass('feed-entry-hidden');
    $(e.currentTarget.children[1]).toggleClass('feed-description-brief');
    debugger
  }
});