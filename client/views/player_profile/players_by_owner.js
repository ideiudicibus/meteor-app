Template.playersByOwner.helpers(

   {
  playersByOwnerCount: function() {
     
    return Players.find().count()
  }
}
)