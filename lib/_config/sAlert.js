Meteor.startup(function() {
  if (Meteor.isClient) {
    return sAlert.config({
      effect: "stackslide",
      position: "bottom-right",
      timeout: 4000,
      html: false
    });
  }
});