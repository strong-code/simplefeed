SimpleFeed.Views.Index = Backbone.View.extend({
  template: JST['index'],

  render: function() {
    var totalUnread = 0;
    this.collection.each(function (feed) {
      totalUnread += parseInt(feed.get('unread'));
    });

    var renderedContent = this.template({
      feeds: this.collection,
      totalUnread: totalUnread,
      congratulations: this.congratulatory(),
      motivational: this.motivational()
    });
    this.$el.html(renderedContent);
    return this;
  },

  congratulatory: function() {
    var msgs = [
      "Way to go champ",
      "Speed reader over here",
      "You little bookworm ;)",
      "You have achieved inbox zero",
      "Congratuliations"
      ];
      return msgs[Math.floor(Math.random() * msgs.length)];
  },

  motivational: function() {
    var msgs = [
      "Better get to reading...",
      "Bro, do you even read?",
      "It's like you aren't even trying",
      "Try reading a bit faster",
      "And it's wasting our bandwidth",
      "And you're running up our hosting bill"
    ];
    return msgs[Math.floor(Math.random() * msgs.length)];
  }
});