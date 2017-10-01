import util from 'util'; 
//import Fiber from 'fiber';

Meteor.startup(function () {

 	       if ( Meteor.settings.private ) {
         process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;
     }

   Meteor.default_server.method_handlers.adminAddUserToRole = function(_id, role){
    check(_id, String);
    check(role, String);
    if (Roles.userIsInRole(this.userId, ['admin'])) {
      Roles.addUsersToRoles(_id, role);
    }
  };
  Meteor.default_server.method_handlers.adminRemoveUserToRole = function(_id, role){
    check(_id, String);
    check(role, String);
    if (Roles.userIsInRole(this.userId, ['admin'])) {
      Roles.removeUsersFromRoles(_id, role);
    }
  }

  });