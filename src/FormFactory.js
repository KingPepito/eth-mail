import {ethers} from "ethers"
import {useEffect, useState} from "react";
import {map} from "lodash";
import {get, post} from "axios";
import Loading from 'react-simple-loading';
import ContractInfo from './ContractInfo';

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
    "outputs": [
      {
        "internalType": "contract EmailReceipt_Contract[]",
        "name": "coll",
        "type": "address[]"
      }
    ],
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
  },
  {
    "inputs": [],
    "name": "getLastEmailReceipt_Contracts",
    "outputs": [
      {
        "internalType": "contract EmailReceipt_Contract",
        "name": "coll",
        "type": "address"
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
      "0x27aE6aD0a13e8cbA32cFE4C2be7449672D74e384",
      EmailReceiptFactory_ABI,
      signer
    );
  });
});


const FormFactory = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  /* 5. Function to set contract details */
  const setNewAcceptance = (acceptance = false) => {
    const emailAdressInput = document.querySelector("#email-address-factory");
    console.log(emailAdressInput);
    /* 5.1 Get inputs from form */
    // 5.2 Getting values from the inputs
    const emailAdress = emailAdressInput.value;
    const timeStampResponse = Date.now().toString()

    /* 5.3 Set details in smart contract */
    EmailReceiptFactory.createEmailReceipt_Contract(emailAdress, timeStampResponse, 'waiting')
      // EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
      .then((res) => {
        /* 5.4 Reset form */
        emailAdressInput.value = "";
        setLoading(true)

        EmailReceiptFactory.getLastEmailReceipt_Contracts().then((address) => {
          console.log('resaddes', address)
          console.log('emailAdressInput.value', emailAdress)
          post('http://localhost:8000/send/'+emailAdress, null, { params: {
              address,
            }}).then(res => console.log('res send', res))
        })

        getListContracts()
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
        setList(res)
        setLoading(false)
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
        <h1>Factory email with acknowledgement receipt</h1>
      </section>
      <form>
        <label htmlFor="email-address">Your Email</label>
        <input type="email" id="email-address-factory"/>
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
      <section className={"list-section"}>
        {
          loading ? <Loading /> :

            <table striped bordered hover size="sm">
              <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
              {map(list, (el, index) => <ContractInfo address={el} index={index} />)}
            </tbody>
          </table>
          }
      </section>
    </section>
  </>
}

export default FormFactory