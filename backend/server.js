const express = require('express')
const cors = require('cors');
require('dotenv').config();

const Web3 = require("web3")
const app = express()
const port = 8000
const Mailjet = require('node-mailjet');
const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: process.env.MJ_APIKEY_PRIVATE || 'your-api-secret'
});

// 2. Set contract address and ABI
const EmailReceiptContract_ABI = [
  {
  "inputs": [{
    "internalType": "string",
    "name": "_email",
    "type": "string"
  }, {"internalType": "string", "name": "_acceptance", "type": "string"}, {
    "internalType": "string",
    "name": "_timeStampResponse",
    "type": "string"
  }], "stateMutability": "nonpayable", "type": "constructor"
}, {
  "inputs": [],
  "name": "acceptance",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "email",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "timeStampResponse",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "string", "name": "newEmail", "type": "string"}, {
    "internalType": "string",
    "name": "newAcceptance",
    "type": "string"
  }, {"internalType": "string", "name": "newTimeStampResponse", "type": "string"}],
  "name": "setEmailReceipt",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "getEmailReceipt",
  "outputs": [{"internalType": "string", "name": "", "type": "string"}, {
    "internalType": "string",
    "name": "",
    "type": "string"
  }, {"internalType": "string", "name": "", "type": "string"}],
  "stateMutability": "view",
  "type": "function"
}]
const web3 = new Web3("http://localhost:7545")

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/send/:email', (req, res) => {
  const {email} = req.params
  const {address} = req.query
  /**
   *
   * This call sends a message to one recipient.
   *
   */
  const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages": [
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

async function updateContract(address, acceptance = false) {
  const Contract = require('web3-eth-contract');

  web3.eth.getAccounts().then(e => {
    const firstAcc = e[0];
    Contract.setProvider("http://localhost:7545");

    const EmailReceiptContract = new Contract(EmailReceiptContract_ABI, address);

    EmailReceiptContract.methods.setEmailReceipt('', Date.now().toString(), acceptance.toString()).send({from: firstAcc})
      .on('receipt', function(){
        console.log('contract done')
      });
  })
}


app.get('/accept/:address', async (req, res) => {
  const {address} = req.params
  console.log("address", address)
  console.log('post accept /')
  await updateContract(address, true)

  res.send('Accepted!')
})

app.get('/refuse/:address', async (req, res) => {
  const {address} = req.params
  await updateContract(address, false)

  res.send('Refused!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

