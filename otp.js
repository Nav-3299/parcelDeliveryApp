const accountSid = 'ACa502eba657637f0b823c89dd26648b0e'; 
const authToken = 'd6a712008190bb9937ae4d4b4a53b344'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Navpreet Kaur',  
         messagingServiceSid: 'MG66047bd3c21583b5f5a0856e208ec147',      
         to: '+917307039393' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();