import accounting from 'accounting';


Template.registerHelper('Config', function() {
  return Config;
});

Template.registerHelper('Schemas', function() {
  return Schemas;
});

Template.registerHelper('Utils', function() {
  return Utils;
});

Template.registerHelper('socialMedia', function() {
  return _.map(Config.socialMedia, function(obj) {
    return obj;
  });
});

Template.registerHelper('currentRoute', function() {
  if (Router && Router.current && Router.current()) {
    return Router.current();
  }
});

Template.registerHelper('isRouteReady', function() {
  return Router && Router.current && Router.current() && Router.current()._waitlist._notReadyCount === 0;
});


Template.registerHelper('formatDate', function(context) {
  var date=new Date(context);
  var fmt=date.toLocaleDateString("en-GB");
  
  return  fmt;
});

Template.registerHelper('formatDateTime', function(context) {
  var date=new Date(context);
  var fmt=date.toLocaleDateString("en-GB");
  fmt+=" "+date.toLocaleTimeString("en-GB");
  return  fmt;
});


Template.registerHelper('getDay', function(context) {
  var date=new Date(context);
  return  date.getDate();
});

Template.registerHelper('getMonth', function(context) {
  var date=new Date(context);
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  var n = month[date.getMonth()].substring(0,3);
  return  n;
});

Template.registerHelper('getYear', function(context) {
  
  var date=new Date(context);
  return  date.getFullYear();
});





Template.registerHelper('jsonStringify',function(content){
  return JSON.stringify(content,null,2);
});

/**
 * player specific helpers
 */
Template.registerHelper('calculateAgeFromDate', function(context) {
 var birthday=new Date(context);
 var ageDifMs = Date.now() - birthday.getTime();
 var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
});

Template.registerHelper('playerFullName',function(player){
  return player.fullName;
});

Template.registerHelper('clubName',function(club){

  return club.name;
});

Template.registerHelper('arrayify',function(obj){
    var result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.registerHelper('firstCollectionElement',function(collection){

var obj=collection.fetch()[0];
 var result = [];
 for (var key in obj) result.push({name:key,value:obj[key]});
    return result;

})

/*Template.registerHelper('formatMoney',function(n){

return accounting.formatMoney(n, "€", 2, ".", ",");

})*/

Template.registerHelper('formatMoney',function(n){
  
  if ( n > 999999){
    n=(n/1000000).toFixed(1) + 'M€';
  }
  else {
  n=accounting.formatMoney(n, "€", 2, ".", ",");
  }
  return n;
  })

