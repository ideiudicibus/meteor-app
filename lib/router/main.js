Router.map(function() {
  this.route("home", {
    path: "/",
    waitOn: function() {
      return [subs.subscribe('featuredDigestPlayers'),subs.subscribe('profilePictures'),subs.subscribe('posts'), subs.subscribe('comments'), subs.subscribe('attachments')];
    },
    layoutTemplate: "homeLayout",
    data: function() {
      return {
        posts: Posts.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch()
      
      };
    }
  });
  this.route("postsDashboard", {
    path: "/posts-dashboard",
    waitOn: function() {
      return [subs.subscribe('posts'), subs.subscribe('comments'), subs.subscribe('attachments'),subs.subscribe('players')];
    },
    data: function() {
      return {
        posts: Posts.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch()
      }
    }
  });
   this.route("fullPlayerProfile",{
    path:"/player/:_id",
    waitOn: function(){return [subs.subscribe('clubs',this.params._id),subs.subscribe('playerById',this.params._id),subs.subscribe('transfersByPlayer',this.params._id),subs.subscribe('statsByPlayer',this.params._id),subs.subscribe('profilePictures')]},
    data:function(){
   
      return {        
        playerById: Players.findOne({_id:this.params._id}),
        transfersByPlayer:Transfers.find({player:this.params._id}),
        statsByPlayer:PlayerStats.find({player:this.params._id})

    }
  }
});
  this.route("playersByOwner",{
    path:"/players/owned/:_id",
    waitOn: function(){return [subs.subscribe('playersByOwner',this.params._id),subs.subscribe('profilePictures')]},
    data:function(){
   
      return {        
        playersByOwner: Players.find({owner:this.params._id}, {
          sort: {
            createdAt: -1
          }
        }).fetch()
    }
  }
});
  this.route("players", {
    path: "/players",
    waitOn: function() {
      return [subs.subscribe('players'), subs.subscribe('profilePictures'), subs.subscribe('donations')];
    },
    data: function() {
      return {
        players: Players.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch(),
        donations: Donations.find({}, {
          sort: {
            createdAt: -1
          }
        }).fetch()
      };
    }
  });
    this.route("tmscrape", {
    path: "/tmscrape"
  });
});

Router.waitOn((function() {
  Meteor.subscribe('donations');
  Meteor.subscribe('clubs');
  Meteor.subscribe('transfers');
  Meteor.subscribe('players');
  Meteor.subscribe('feeds');
  Meteor.subscribe('feed_entries');
}), {
  only: ['adminDashboard',
  'adminDashboardPostsView',
  'adminDashboardPostsNew',
  'adminDashboardPostsEdit',
  'adminDashboardDonationsView', 
  'adminDashboardDonationsNew',
  'adminDashboardDonationsEdit',
  'adminDashboardPlayersNew',
  'adminDashboardPlayersEdit',
  'adminDashboardTransfers',
  'adminDashboardTransfersNew',
  'adminDashboardTransfersView',
  'adminDashboardTransfersEdit',
  'adminDashboardPlayerStats',
  'adminDashboardPlayerStatsNew',
  'adminDashboardPlayerStatsView',
  'adminDashboardPlayerStatsEdit']
});