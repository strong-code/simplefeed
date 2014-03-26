SimpleFeed.Views.Index = Backbone.View.extend({
  template: JST['index'],

  render: function() {
    var totalUnread = 0;
    this.collection.each(function (feed) {
      totalUnread += parseInt(feed.get('unread'));
    });

    var renderedContent = this.template({
      feeds: this.collection,
      totalUnread: totalUnread
    });
    this.$el.html(renderedContent);
    return this;
  }
});