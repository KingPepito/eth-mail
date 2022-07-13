import {ethers} from "ethers"
import {useEffect, useState} from "react";
import {map} from "lodash";
// 1. Declare global variable to store the web3 instance
let EmailReceiptContract;
let EmailReceiptFactory;
// 2. Set contract address and ABI
const EmailReceiptFactory_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "acceptance",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "timeStampResponse",
        "type": "string"
      }
    ],
    "name": "createEmailReceipt_Contract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "oldNumber",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "storedNumber",
    "type": "event"
  },
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
  },
  {
    "inputs": [],
    "name": "allEmailReceipt_Contracts",
    "outputs": [
      {
        "internalType": "contract EmailReceipt_Contract[]",
        "name": "coll",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const providerFactory = new ethers.providers.Web3Provider(window.ethereum, "any");

providerFactory.send("eth_requestAccounts", []).then(() => {
  providerFactory.listAccounts().then((accounts) => {
    const signer = providerFactory.getSigner(accounts[0]);

    /* 3.1 Create instance OF smart contract */
    EmailReceiptFactory = new ethers.Contract(
      // Please enter your current factory instance id
      "0x3A8fcd8b598DFDE2b2bDb5b56A06BA0403b2c2f9",
      EmailReceiptFactory_ABI,
      signer
    );
    console.log("EmailReceiptFactory", EmailReceiptFactory)

  });
});


const FormFactory = () => {
  const [list, setList] = useState([])
  /* 5. Function to set contract details */
  const setNewAcceptance = (acceptance = false) => {

    /* 5.1 Get inputs from form */
    const emailAdressInput = document.querySelector("#email-address");
    // 5.2 Getting values from the inputs
    const emailAdress = emailAdressInput.value;
    const timeStampResponse = Date.now().toString()
    console.log('emailAdress', emailAdress)
    console.log('timeStampResponse', timeStampResponse)
    console.log('acceptance', acceptance)
    console.log('EmailReceiptFactory', EmailReceiptFactory)

    /* 5.3 Set details in smart contract */
    EmailReceiptFactory.createEmailReceipt_Contract(emailAdress, timeStampResponse, acceptance.toString())
      // EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
      .then(() => {
        // update button value
        // acceptButton.value = "Accepting...";

        /* 5.4 Reset form */
        emailAdressInput.value = "";

        /* 5.5 Get details from smart contract */
        // getCurrentStatus();
      })
      .catch((err) => {
        // If error occurs, display error message
        alert("Error setting receipt details" + err.message);
      });
  };
  const getListContracts = () => {
    console.log("EmailReceiptFactory", EmailReceiptFactory);
    /* 5.3 Set details in smart contract */
    EmailReceiptFactory.allEmailReceipt_Contracts()
      // EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
      .then((res) => {
        console.log('list is', res)
        setList(res)
      })
      .catch((err) => {
        // If error occurs, display error message
        alert("Error setting receipt details" + err.message);
      });
  };

  useEffect(() => {
    setTimeout(getListContracts, 2000)

  }, [])

  return <>
    <section className="email-form-section">
      <section className="section-header">
        <h1>Factory form</h1>
      </section>
      <form>
        <label htmlFor="email-address">Your Email</label>
        <input type="email" id="email-address"/>
        <div className="buttons-form">
          <input type="button" value="✔" id="accept" onClick={() => setNewAcceptance(true)}/>
          <input type="button" value="✘" id="refuse" onClick={() => setNewAcceptance(false)}/>
        </div>
      </form>
    </section>
    <section >
      <section className="section-header">
        <h1>List contracts created</h1>
      </section>
      <ul className={"list-section"} >
        {map(list, el => <li>{el}</li>)}
      </ul>

    </section>
  </>
}

export default FormFactory