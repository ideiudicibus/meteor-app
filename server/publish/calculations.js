Meteor.publish('donationsAmountByPlayerId', 
  function(playerId) {
  	check( playerId, String );

    var filter={ player: playerId };
    check( filter, Object );

    var group = {
      _id: {
        player: '$playerId'
      },
      total: {
        $sum: '$amount'
      }
    };
     var self = this;


    Donations.aggregate(
      { $match: filter },
      { $group: group}
    ).forEach(function(obj){

    	self.added('donationsAmountByPlayerId', obj._id, obj);
    });


});
