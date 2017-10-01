Meteor.publish('booksSearch', function(query) {
  var tags=Config.searchContentTags;
  /*var postTags=Posts.findOne({}).tags;
  if(postTags){tags+=' '+(postTags.join().replace(',',' '));}
  console.log(tags);
  */
  var self = this;
  try {
  

    var twitter_parameters = {
      consumer_key: Meteor.settings.private.twitter_consumer_key,
      consumer_secret: Meteor.settings.private.twitter_consumer_secret, 
      access_token: Meteor.settings.private.twitter_access_token,
      access_token_secret: Meteor.settings.private.twitter_access_token_secret,
     
  };
;;
var T = new Twit(twitter_parameters);
var wrapGet = Meteor.wrapAsync(T.get, T);
var data =wrapGet('search/tweets', { q: tags, count: 6 });
if (data) {
    
  _.each(data.statuses, function(item) {
    var tweet=item;
    tweet.createdAt = new Date();
    self.added('books', Random.id(), tweet);
    
  });
}
self.ready();

  } catch(error) {
    console.log(error);
  }
});



Meteor.publish('booksSearchStream', function(query) {
  var tags=Config.searchContentTags;
  var self = this;
  try {
    
    var twitter_parameters = {
      consumer_key: Meteor.settings.private.twitter_consumer_key,
      consumer_secret: Meteor.settings.private.twitter_consumer_secret, 
      access_token: Meteor.settings.private.twitter_access_token,
      access_token_secret: Meteor.settings.private.twitter_access_token_secret,
     
  };
;;
var T = new Twit(twitter_parameters);


var stream = T.stream('statuses/filter',  { track: tags  });
stream.on('tweet', function (tweet) {
  tweet.createdAt = new Date();
  self.added('books', Random.id(), tweet);
  self.ready();
 
 });

 self.ready();
  } catch(error) {
    console.log(error);
  }
});