SimpleFeed.Views.FeedsIndex = Backbone.View.extend({
  template: JST['feeds/index'],

  initialize: function(user) {
    this.user = user.user;
  },

  events: {

  },

  render: function() {
    var that = this;
    this.user.fetch({
      success: function() {
        that.$el.html(that.template({
          feeds: that.collection,
          user: that.user
        }));
      }
    });
    return this;
  }

});