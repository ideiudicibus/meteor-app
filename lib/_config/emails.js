
if (Meteor.isServer) {
  var options;
  options = {
    siteName: Config.name
  };
  if (Config.socialMedia) {
    _.each(Config.socialMedia, function(v, k) {
      return options[k] = v.url;
    });
  }
  if (Config.legal) {
    options.companyAddress = Config.legal.address;
    options.companyName = Config.legal.name;
    options.companyUrl = Config.legal.url;
  }
  PrettyEmail.options = options;
}
