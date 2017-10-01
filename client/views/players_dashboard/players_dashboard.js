Template.player.helpers({  

    processing() {
    return Template.instance().processing.get();
  },
  paymentSucceeded() {
    return Template.instance().paymentSucceeded.get();
  },
  getTotalDonationsAmount() {
    var amountArr = Template.instance().totalAmount.get();
    if(amountArr){
    var amountValue=amountArr.length>0?(amountArr[0].total)/100:0.0
    return amountValue;}
    return 0.0
  }
});

var  fetchData =function ( filters, template ) {
  Meteor.call( 'getDonationsData', filters, ( error, response ) => {
    if ( error ) {
     console.log(error.reason );
    } else {
     
      template.totalAmount.set( response );
    }
  });
}

Template.player.onRendered(()=>{
 fetchData( { player: Template.instance().data._id}, Template.instance() );

})

Template.player.onCreated( () => {
  var template = Template.instance();

  template.selectedService  = new ReactiveVar( false );
  template.processing       = new ReactiveVar( false );
  template.totalAmount = new ReactiveVar();

 
   //console.log(playerProfileImg);
   
  template.checkout = StripeCheckout.configure({
    key: Meteor.settings.public.stripe,
    image: '',
    locale: 'auto',
    token( token ) {
     
      
      var service = template.selectedService.get(),
          charge  = {
            amount: token.amount || service.amount,
            currency: "eur",
            source: token.id,
            description: token.description || service.description,
            receipt_email: token.email,
            metadata:service.metadata
          };
          
       
      Meteor.call( 'processPayment', charge, ( error, response ) => {
      	
        if ( error ) {
          template.processing.set( false );
          Bert.alert( error.reason, 'danger' );
        } else {
          
          Bert.alert( 'Thank you for donating...', 'success' );

        }
      });
    },
    closed() {
      template.processing.set( false );
    }
  });
});



Template.player.events({
  'click [data-service]' ( event, template ) {
    var donationPricing = {
      'donate-eur-5': {
        amount: 500,
        description: "€ 5"
      },
      'donate-eur-7': {
        amount: 700,
        description: "€ 7"
      },
      'donate-eur-10': {
        amount: 1000,
        description: "€ 10"
      }
    };

    var playerId=template.find('[data-playerId]').attributes['data-playerId'].value;
    var playerFullName=template.find('[data-playerFullName]').attributes['data-playerFullName'].value;
    
    var service = donationPricing[ event.target.dataset.service ];
    var metadata={};
    metadata.playerId=playerId;
    metadata.playerFullName=playerFullName;
    metadata.userId=Meteor.userId()?Meteor.userId():"anonymous";
    
    service.metadata={};
    service.metadata=_.extend(service.metadata,metadata);

    template.selectedService.set( service );
    template.processing.set( true );

    template.checkout.open({
      name: 'Donation Service',
      description: service.description,
      amount: service.amount,
      bitcoin: false,
      currency: "eur"
    });
  }
});