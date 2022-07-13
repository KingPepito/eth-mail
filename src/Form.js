import {ethers} from "ethers"
// 1. Declare global variable to store the web3 instance
let EmailReceiptContract;
let EmailReceiptFactory;
// 2. Set contract address and ABI
const EmailReceiptContract_Address = "0x179E8B875cC2376d8af4BF1ac5c5873f2B26fa60";
const EmailReceiptContract_ABI = [{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_acceptance","type":"string"},{"internalType":"string","name":"_timeStampResponse","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"acceptance","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"email","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeStampResponse","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newEmail","type":"string"},{"internalType":"string","name":"newAcceptance","type":"string"},{"internalType":"string","name":"newTimeStampResponse","type":"string"}],"name":"setEmailReceipt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getEmailReceipt","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
console.log(2)
console.log(provider)

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance OF smart contract */
    EmailReceiptContract = new ethers.Contract(
      EmailReceiptContract_Address,
      EmailReceiptContract_ABI,
      signer
    );
    console.log("EmailReceiptContract", EmailReceiptContract)
  });
});


const Form = () => {
  // 4. Creating variables for reusable dom elements

  // const acceptButton = document.querySelector("#accept");

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
    // EmailReceiptFactory.test()
      EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
      .then(() => {
        // update button value
        // acceptButton.value = "Accepting...";

        /* 5.4 Reset form */
        emailAdressInput.value = "";

        /* 5.5 Get details from smart contract */
        getCurrentStatus();
      })
      .catch((err) => {
        // If error occurs, display error message
        alert("Error setting receipt details" + err.message);
      });
  };

  /* 6. Function to get details */
  const getCurrentStatus = async () => {
    const formSection = document.querySelector(".email-form-section");
    const detailsSection = document.querySelector(".detail-section");
    console.log("getCurrentStatus")
    // acceptButton.value = "Getting status...";
    /* 6.1 Get details from smart contract */
    const emailReceipt = await EmailReceiptContract.getEmailReceipt();

    /* 6.2 Display the emailReceipt details section

     6.2.1 Hide the emailReceipt form in DOM */
    detailsSection.style.display = "block";
    formSection.style.display = "none";
    /* 6.3 emailReceipt is an array of 3 strings [email, acceptance, timeStampResponse] */
    const email = emailReceipt[0];
    const timeStampResponse = emailReceipt[1];
    const acceptance = emailReceipt[2];
    console.log(emailReceipt);
    /* 6.4 Display emailReceipt details in DOM */
    document.querySelector(".detail-email").innerText = email;
    document.querySelector(".detail-acceptance").innerText = acceptance;
    document.querySelector(".detail-timestamp").innerText = timeStampResponse;
  };

  /* 7. Function to show the form on click of button */
  const update = () => {
    const formSection = document.querySelector(".email-form-section");
    const detailsSection = document.querySelector(".detail-section");
    detailsSection.style.display = "none";
    formSection.style.display = "block";
    // acceptButton.value = "Submit";
  }
  // /* 8. Function to refresh details */
  const refresh = (e) => {
    e.target.innerText = "Refreshing...";
    getCurrentStatus().then(() => {
      e.target.innerText = "Refreshed";
      setTimeout(() => {
        e.target.innerText = "Refresh";
      }, 2000);
    });
  }

  return <>
    <section className="email-form-section">
      <section className="section-header">
        <h1>Please accept this email</h1>
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
    <section className="detail-section">
      <section className="section-header">
        <h1>Acceptance email Details</h1>
      </section>
      <section className="details">
        <h3 className="detail-heading">
          Email:
          <span className="pet-data detail-email"></span>
        </h3>
        <h3 className="detail-heading">
          Acceptance:
          <span className="pet-data detail-acceptance"></span>
        </h3>
        <h3 className="detail-heading">
          Timestamp:
          <span className="pet-data detail-timestamp"></span>
        </h3>
      </section>
      <section className="section-footer">
        <button className="show-email-form-btn" onClick={update}>Update info</button>
        <button className="refresh-details-btn" onClick={refresh}>Refresh</button>
      </section>
    </section>
  </>
}

export default Form