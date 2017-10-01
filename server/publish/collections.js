//You'll want to replace these functions. They publish the whole
//collection which is problematic after your app grows

Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});

Meteor.publish('players', function() {
  return Players.find();
});


Meteor.publish('playersByOwner', function(ownerId) {
  
  return Players.find({owner:ownerId});
});

Meteor.publish('playerById', function(playerId) {

  return Players.find({_id:playerId});
});




  //**simple way to joins, digestePlayers is a memory collection */
  Meteor.publish('featuredDigestPlayers', function () {
    var self = this;
    var player=Players.findOne({featured:true});
    var transfers= Transfers.find({player:player._id}, {sort: {date: -1}}).fetch()
    if(transfers){
        var lastTransfer=_.omit(transfers[0],['_id','player','date','createdAt']) 
        player= _.extend(player,{lastTransfer:lastTransfer});
    }
    else{
      lastTransfer= { "season": "", "market_value": 0, "fee": 0 };
      player= _.extend(player,{lastTransfer:lastTransfer});
    }
    self.added('digestPlayers', player._id, player);
    self.ready();
  });
  

Meteor.publish('transfersByPlayer', function(playerId) {

  return Transfers.find({player:playerId});
});



Meteor.publish('statsByPlayer', function(playerId) {

  return PlayerStats.find({player:playerId});
});

Meteor.publish('transfers', function() {

  return Transfers.find();
});

Meteor.publish('stats', function() {

  return PlayerStats.find();
});

Meteor.publish('profilePictures', function() {
  return ProfilePictures.find();
});

Meteor.publish('clubPictures', function() {
  return ClubPictures.find();
});

Meteor.publish('clubs', function() {
  return Clubs.find();
});

Meteor.publish('donations', function() {
  return Donations.find();
});


