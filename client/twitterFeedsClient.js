

  Session.setDefault('searching', false);
  Session.set('query', 'test');

  Tracker.autorun(function() {
    if (Session.get('query')) {
      var searchHandle = Meteor.subscribe('booksSearch', Session.get('query'));
      var searchHandleStream = {};//;Meteor.subscribe('booksSearchStream', Session.get('query'));
      
      Session.set('searching', 
      !searchHandle.ready() 
      //|| 
      //!searchHandleStream.ready() 
    );
    }
  });


  Template.home.helpers({
    books: function() {
      return Books.find({},{limit:3,sort: {createdAt: -1}});
    },
    searching: function() {
      return Session.get('searching');
    },
    featuredDigestPlayers:function(){
      return DigestPlayers.find({});
    },
    post:function(){return Posts.findOne({})}
  });

  