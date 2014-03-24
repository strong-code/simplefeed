SimpleFeed.Views.FeedsIndex = Backbone.View.extend({

  template: JST['feeds/index'],

  initialize: function() {
    this.listenTo(this.collection, "remove add change", this.render);
  },

  events: {
    "click .glyphicon-trash" : "deleteFeed",
    "click .glyphicon-refresh" : "refreshFeed",
    "click .input-group-btn" : "addFeed"
  },

  render: function() {
    // var renderedContent;
    // renderedContent = this.template({
    //   feeds: this.collection
    // });
    // debugger
    //
    // this.$el.html(renderedContent);

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
    $('#submit-new-feed-icon').toggleClass('glyphicon-plus-sign');
    $('#submit-new-feed-icon').toggleClass('glyphicon-cog');
    $('#submit-new-feed-icon').toggleClass('spin');
    e.preventDefault();
    var url = $('input.form-control').val();
    var newFeed = this.collection.create({url: url}, {wait: true});
  },

  refreshFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    $(e.currentTarget).toggleClass("spin");
    var that = this;
    this.collection.get(feedId).fetch({
      success: function() {
        $(e.currentTarget).toggleClass("spin");
      }
    });
  },

  deleteFeed: function(e) {
    $(e.currentTarget).toggleClass("glyphicon-trash");
    $(e.currentTarget).toggleClass("glyphicon-cog");
    $(e.currentTarget).toggleClass("spin");
    var feedId = $(e.currentTarget).data('id');
    var feed = this.collection.get(feedId);
    this.collection.remove(feedId)
    feed.destroy({url: '/feeds/'+feedId}, {wait: true});
  }

});