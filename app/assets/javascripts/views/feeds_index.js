SimpleFeed.Views.FeedsIndex = Backbone.View.extend({

  template: JST['feeds/index'],

  initialize: function() {
    this.listenTo(this.collection, "create add remove", this.render);
  },

  events: {
    "click .glyphicon-trash" : "deleteFeed",
    "click .glyphicon-refresh" : "refreshFeed",
    "click .input-group-btn" : "addFeed"
  },

  render: function() {
    var renderedContent;
    var that = this;

    this.collection.fetch({
      success: function() {
        renderedContent = that.template({
          feeds: that.collection
        });
        that.$el.html(renderedContent);
      }
    });
  },

  addFeed: function(e) {
    e.preventDefault();
    var url = $('input.form-control').val();
    var newFeed = this.collection.create({url: url}, {wait: true});
  },

  refreshFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    $(e.currentTarget).toggleClass("spin");
    var that = this;
    this.collection.get(feedId).fetch({
      success: function(that) {
        $(e.currentTarget).toggleClass("spin");
      }
    });
  },

  deleteFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    var feed = this.collection.get(feedId);
    this.collection.remove(feedId)
    feed.destroy({url: '/feeds/'+feedId});
  }

});