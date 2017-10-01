this.Config = {
  name: 'playeragent.it',
  domain: 'playeragent.it',
  title: function() {
    return TAPi18n.__('configTitle');
  },
  subtitle: function() {
    return TAPi18n.__('configSubtitle');
  },
  logo: function() {
    return '<b>' + this.name + '</b>';
  },
  footer: function() {
    return this.name + ' - Copyright ' + new Date().getFullYear();
  },
  domainApp: function() {
    return this.domain;
  },
  emails: {
    from: 'no-reply@playeragent.it',
    contact: 'hello@playeragent.it'
  },
  username: false,
  defaultLanguage: 'en',
  dateFormat: 'DD/MM/YYYY',
  privacyUrl: '/privacy',
  termsUrl: '/tos',
  legal: {
    address: 'Via, Piazza',
    name: 'Sede Legale ',
    url: this.domainApp
  },
  about: 'http://playeragent.it',
  blog: 'http://playeragent.it',
  socialMedia: {
    facebook: {
      url: 'http://playeragent.it',
      icon: 'facebook'
    },
    twitter: {
      url: 'http://playeragent.it',
      icon: 'twitter'
    },
    github: {
      url: 'http://playeragent.it',
      icon: 'github'
    },
    info: {
      url: 'http://playeragent.it',
      icon: 'link'
    }
  },
  homeRoute: '/',
  publicRoutes: ['home'],
  playersRoute: '/players_dashboard',
  searchContentTags:'calciomercato OR transfermarket'
};

