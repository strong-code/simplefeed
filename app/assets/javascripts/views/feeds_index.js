SimpleFeed.Views.FeedsIndex = Backbone.View.extend({

  template: JST['feeds/feeds_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync change remove", this.render);
  },

  events: {
    "click .glyphicon-trash" : "deleteFeed",
    "click .glyphicon-refresh" : "refreshFeed",
    "click .input-group-btn" : "addFeed",
    "click .feed-item-container" : "showFeed",
    "click .unread-entry-count" : "markAllEntriesRead"
  },

  render: function() {
    var renderedContent;
    renderedContent = this.template({
      feeds: this.collection
    });

    this.$el.html(renderedContent);

    var feedId = /\/feeds\/(\d*)$/.exec($(location).attr('hash'));
    var $elem = $('#container-'+feedId[1]);
    if (!$elem.hasClass('selected-feed')) {
       $elem.toggleClass('selected-feed');
    }
  },

  addFeed: function(e) {
    $('#submit-new-feed-icon').toggleClass('glyphicon-plus-sign');
    $('#submit-new-feed-icon').toggleClass('glyphicon-cog');
    $('#submit-new-feed-icon').toggleClass('spin');
    e.preventDefault();
    var url = $('input.form-control').val();
    var newFeed = this.collection.create({url: url});
  },

  refreshFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    var elem = $(e.currentTarget)
    elem.toggleClass("spin");
    var that = this;
    this.collection.get(feedId).fetch({
      success: function() {
        elem.toggleClass('spin');
      }
    });
  },

  deleteFeed: function(e) {
    $(e.currentTarget).toggleClass("glyphicon-trash");
    $(e.currentTarget).toggleClass("glyphicon-cog");
    $(e.currentTarget).toggleClass("spin");
    var feedId = $(e.currentTarget).data('id');
    var feed = this.collection.get(feedId);
    window.location.href = "#/";
    feed.destroy({url: '/feeds/'+feedId}, {wait: true});
    this.collection.remove(feedId)
  },

  showFeed: function(e) {
    //ignore refresh/trash icon clicks - they are their own thing
    if ($(e.target).hasClass('glyphicon')) {
      return
    }

    var feedId = $(e.currentTarget).data('id');
    $('.selected-feed').toggleClass('selected-feed');
    $('#container-'+feedId).toggleClass('selected-feed');
    window.location.href = "#/feeds/"+feedId;
  },

  markAllEntriesRead: function(e) {
    var feedId = $(e.currentTarget.parentElement).data('id');
    var feed = this.collection.get(feedId);
    feed.entries().each(function(entry) {
      entry.set({'read' : true})
      entry.save();
    });
    feed.fetch();
  }

});