
const express = require('express')
const cors = require('cors');
require('dotenv').config();
// import mailjet from "node-mailjet";
// console.log('mailjet', mailjet)
const app = express()
const port = 8000
const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret'
});
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {

  console.log('GEt /')
  res.send('Hello World!')
})

console.log("process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE", process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

app.post('/send/:email', (req, res) => {
  const {email} = req.params
  const {address} = req.query
  console.log("email", email)
  console.log("address", address)
  /**
   *
   * This call sends a message to one recipient.
   *
   */
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "achantchisong@mailgun.com",
            "Name": "Mailjet Pilot"
          },
          "To": [
            {
              "Email": email,
              "Name": "passenger 1"
            }
          ],
          "Subject": "Your email flight plan!",
          "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
          "HTMLPart": `<h3>Please click here to confirm receipt <a href=\"http://localhost:8000/accept/${address}\">Confirm</a> OR <a href=\"http://localhost:8000/refuse/${address}\">Refuse</a>!!</h3><br /> Wubalubadubdub!"`
        }
      ]
    })
  request
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log('err:', err.statusCode)
      res.send(err)
    })
})

app.get('/accept/:address', (req, res) => {
  const {address} = req.params
  console.log("address", address)
  console.log('post accept /')

  // Change contract states
  // EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
  //   .then(() => {
  //     // update button value
  //     // acceptButton.value = "Accepting...";
  //
  //     /* 5.4 Reset form */
  //     emailAdressInput.value = "";
  //
  //     /* 5.5 Get details from smart contract */
  //     getCurrentStatus();
  //   })
  //   .catch((err) => {
  //     // If error occurs, display error message
  //     alert("Error setting receipt details" + err.message);
  //   });

  res.send('Hello World!')
})

app.get('/refuse/:address', (req, res) => {
  const {address} = req.params
  console.log("address", address)
  console.log('post refuse /')
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

