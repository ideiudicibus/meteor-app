var Stripe = StripeAPI( Meteor.settings.private.stripe );

Meteor.methods({
  'processPayment':function( charge ) {
   /*check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String,

      metadata: Match.ObjectIncluding({playerId:String, playerFullName: String})
      
    });
    */
    
    var handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges );
    var payment      = handleCharge( charge );

    
    /*var donation={transactionId:payment.id,amount:payment.amount,currency:payment.currency,player:payment.metadata.playerId,user:payment.metadata.userId,givenEmail:payment.receipt_email,createdAt:new Date(),transactionDate: new Date(payment.created*1000)};
    var donationId=Donations.insert(donation);
    */
   
    return payment;
  }
});


Meteor.methods({
  'listTransactions':function( charge ) {
  
      
 var listTransactions = Meteor.wrapAsync( Stripe.balance.listTransactions);
    var listTransactions      = listTransactions( charge );

   
    return listTransactions;
  }
});

Meteor.methods({
  'getDonationsData':function( filter ) {
    check( filter, Object );
    
    var group = {
      _id: {
        player: '$playerId'
      },
      total: {
        $sum: '$amount'
      }
    };
    


    return Donations.aggregate(
      { $match: filter },
      { $group: group}
    );
  }
});