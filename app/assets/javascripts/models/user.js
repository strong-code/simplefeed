SimpleFeed.Models.User = Backbone.Model.extend({

  initialize: function(user_id) {
    this.id = user_id;
  },

  url: function() {
    return "/users/"+this.id;
  }

})