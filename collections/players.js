this.Players = new Meteor.Collection('players');
this.Donations = new Meteor.Collection('donations');
this.Transfers =new Meteor.Collection('transfers');
this.Clubs=new Meteor.Collection('clubs');
this.PlayerStats = new Meteor.Collection('playerStats');

this.Books = new Meteor.Collection('books');
this.DigestPlayers = new Meteor.Collection('digestPlayers');



Schemas.PlayerProfile = new SimpleSchema({
  featured:{
    type:Boolean
  },
  picture: {
    type: String,
    label: 'Profile picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    },
    optional: true
  },
  fullName: {
    type: String
  },
  position: {
    type: String,
    label: 'Position',
    //allowedValues: Utils.playerPositionList,
    optional: true
  },
  birthDate: {
    type: Date,
    optional: true
  },
  age: {
    type: Number,
    optional: true
  },
  birthPlace: {
    type: String,
    optional: true
  },
  nationality: {
    type: String,
    label: 'Nationality',
   // allowedValues: Utils.countryList,
    optional: true
  },
  height: {
    type: String,
    label: 'height',
    optional: true
  },
  foot: {
    type: String,
    label: "preferred foot",
    //allowedValues: ['', 'both', 'left', 'right'],
    optional: true
  },
  currentAgent: {
    type: String,
    label: "current agent",
    optional: true
  },
  currentClub: {
    type: String,
    label: "current Club",
    optional: true
  },

  currentContractFrom: {
    type: Date,
    label: "current contract start",
    optional: true
  },
  currentContractTo: {
    type: Date,
    label: "current contract end",
    optional: true
  },
  transferMarktPlayerId: {
    type: String,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  },
  owner: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

Schemas.TmPlayerStats=new SimpleSchema({
    season:{
    type:String,
    label:'Season',
    optional:true},

    competition:{
    type:String,
    label:'Competition',
    optional:true},
    
    club:{
    type:String,
    label:'club',
    optional:true},
    
    matches:{
    type:Number,
    label:'matches',
    optional:true},
    
    points_per_match:{
    type:Number,
    decimal:true,
    label:'points per match',
    optional:true},
    
    goals:{
    type:Number,
    label:'goals',
    optional:true},
    
    assists:{
    type:Number,
    label:'assists',
    optional:true},
    
    played_minutes:{
    type:Number,
    label:'played_minutes',
    optional:true}

})

Schemas.PlayerStats=new SimpleSchema({

  player: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Players.find().fetch(), function(player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
  season: {
    type: String,
    label: 'Season',
    optional:true
  },
  competition: {
    type: String,
    label: 'Competition',
    optional:true
  },
  club: {
    label: 'Club',
    type: String,
    optional:true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Clubs.find().fetch(), function(club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  matches:{
    type:Number,
    label:'Matches',
    optional:true},
  points_per_match:{
    type:Number,
    decimal:true,
    label:'Points per Match',
    optional:true},
  goals:{
    type:Number,
    label:'Goals',
    optional:true},
  assists:{
    type:Number,
    label:'Assists',
    optional:true},
  played_minutes:{
    type:Number,
    label:'Played Minutes',
    optional:true}
})

Schemas.Donation = new SimpleSchema({
  givenEmail: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: 'E-mail'
  },
  user: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  },
  player: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Players.find().fetch(), function(player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
  amount: {
    type: Number,
    decimal: true
  },
  transactionId: {
    type: String,
    label: 'TransactionId id',
    optional: true
  },
  transactionDate: {
    type: Date,
    label: 'Transaction Date',
    optional: true
  }
});

Schemas.Club =new SimpleSchema({
 name: {
    type: String,
    label: 'Name'
  },
   nationality: {
    type: String,
    label: 'Nationality',
    allowedValues: Utils.countryList,
    optional: true
  },
  picture: {
    type: String,
    label: 'Club picture',
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProfilePictures'
      }
    },
    optional: true
  }
  

})


Schemas.Transfer = new SimpleSchema({
  
  player: {
    label: 'Player',
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Players.find().fetch(), function(player) {
          return {
            label: player.fullName,
            value: player._id
          };
        });
      }
    }
  },
   season: {
    type: String,
    label: 'Season',
    //allowedValues: Utils.seasonList,
    optional: true
  },
   date: {
    type: Date,
    label: 'Date',
    optional:true
  },
  buyer_club: {
    label: 'Buyer',
    type: String,
    optional:true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Clubs.find().fetch(), function(club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  seller_club: {
    label: 'Seller',
    type: String,
    optional:true,
    regEx: SimpleSchema.RegEx.Id,
    autoform: {
      options: function() {
        return _.map(Clubs.find().fetch(), function(club) {
          return {
            label: club.name,
            value: club._id
          };
        });
      }
    }
  },
  market_value: {
    label: 'Market Value',
    type: Number
  },
  fee: {
    label: 'Transfer fee',
    type: Number
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    }
  }

});

Schemas.TmTransfer = new SimpleSchema({
  season: {
    label: 'Season',
    type: String
  },
  transferDate: {
    label: 'transfer date',
    type: Date
  },
   movingFrom: {
    label: 'moving From',
    type: String
  },
   movingTo: {
    label: 'moving to',
    type: String
  },
    marketValue: {
    label: 'market Value',
    type: Number
  },
  transferFee: {
    label: 'transfer fee Value',
    type: Number
  },
});

Schemas.TransferHistoryWrapper = new SimpleSchema({
  tmPlayerId:{type:String},
  transferHistoryList:{type:Array,optional:true},
  'transferHistoryList.$':{type:Schemas.TmTransfer}
  
});

Schemas.PlayerStatsWrapper = new SimpleSchema({
  tmPlayerId:{type:String},
  tmPlayerStatsList:{type:Array,optional:true},
  'tmPlayerStatsList.$':{type:Schemas.TmPlayerStats}
  
});

Clubs.attachSchema(Schemas.Club);
Players.attachSchema(Schemas.PlayerProfile);
Donations.attachSchema(Schemas.Donation);
Transfers.attachSchema(Schemas.Transfer);
PlayerStats.attachSchema(Schemas.PlayerStats);


Donations.helpers({
  playerRef: function() {
    var player;
    return player = Players.findOne(this.player);
  }
});

PlayerStats.helpers({
  playerRef: function() {
    var player;
    return player = Players.findOne(this.player);
  },
  clubRef: function() {
    var club;
    return club = Clubs.findOne(this.club);
  }
});


Transfers.helpers({
  playerRef: function() {
    var player;
    return player = Players.findOne(this.player);
  },
  buyerClubRef: function() {
    var club;
    return club = Clubs.findOne(this.buyer_club);
  },
  sellerClubRef: function() {
    var club;
    return club = Clubs.findOne(this.seller_club);
  }
});



