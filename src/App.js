import './App.css';
import Helmet from 'react-helmet'
import {ethers} from "ethers"
import Form from "./Form";
import FormFactory from "./FormFactory";
// // 1. Declare global variable to store the web3 instance
let EmailReceiptContract;
let EmailReceiptFactory;
// 2. Set contract address and ABI
const EmailReceiptContract_Address = "0x179E8B875cC2376d8af4BF1ac5c5873f2B26fa60";
const EmailReceiptContract_ABI = [{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_acceptance","type":"string"},{"internalType":"string","name":"_timeStampResponse","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"acceptance","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"email","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeStampResponse","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newEmail","type":"string"},{"internalType":"string","name":"newAcceptance","type":"string"},{"internalType":"string","name":"newTimeStampResponse","type":"string"}],"name":"setEmailReceipt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getEmailReceipt","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

const EmailReceiptFactory_ABI = [
  {
    "inputs": [],
    "name": "test",
    "outputs": [
      {
        "internalType": "string",
        "name": "testas",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
console.log(EmailReceiptContract_ABI)
/* 3. Prompt user to sign in to MetaMask */


// const providerFactory = new ethers.providers.Web3Provider(window.ethereum, "any");
console.log(2)

// const getAllStatus = async () => {
//   console.log("getCurrentStatus")
//   // acceptButton.value = "Getting status...";
//   /* 6.1 Get details from smart contract */
//   const emailReceipt = await allEmailReceipt_Contracts.allEmailReceipt_Contracts(1, 1);
//
//   /* 6.2 Display the emailReceipt details section
//
//    6.2.1 Hide the emailReceipt form in DOM */
//   // detailsSection.style.display = "block";
//   // formSection.style.display = "none";
//   /* 6.3 emailReceipt is an array of 3 strings [email, acceptance, timeStampResponse] */
//   const email = emailReceipt[0];
//   const timeStampResponse = emailReceipt[1];
//   const acceptance = emailReceipt[2];
//   console.log("allemailReceipt", emailReceipt);
//   /* 6.4 Display emailReceipt details in DOM */
//   document.querySelector(".detail-email").innerText = email;
//   document.querySelector(".detail-acceptance").innerText = acceptance;
//   document.querySelector(".detail-timestamp").innerText = timeStampResponse;
// };
// providerFactory.send("eth_requestAccounts", []).then(() => {
//   providerFactory.listAccounts().then((accounts) => {
//     const signer = providerFactory.getSigner(accounts[0]);
//
//     /* 3.1 Create instance OF smart contract */
//     EmailReceiptFactory = new ethers.Contract(
//       "0x816Ac5bEaBB19c2B9239272a4a67d2838fddf286",
//       EmailReceiptFactory_ABI,
//       signer
//     );
//     console.log("EmailReceiptFactory", EmailReceiptFactory)
//
//   });
// });

function App() {
  return (
  <html lang="en">
  <Helmet>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email acknowledgement receipt</title>
    <script
      src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"
      type="application/javascript"
    />

    <script src="../receipt-storage/index.js" type="application/javascript" />
  </Helmet>
  <body>
  <Form />
  <FormFactory />
  </body>
  </html>

);
}

export default App;
