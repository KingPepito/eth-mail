// 1. Declare global variable to store the web3 instance
let EmailReceiptContract;

// 2. Set contract address and ABI
const EmailReceiptContract_Address = "0x1907961843bAD4E8CB58435c0617A9B04091DF06";
const EmailReceiptContract_ABI = [{"inputs":[],"name":"acceptance","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"email","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeStampResponse","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newEmail","type":"string"},{"internalType":"string","name":"newAcceptance","type":"string"},{"internalType":"string","name":"newTimeStampResponse","type":"string"}],"name":"setEmailReceipt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getEmailReceipt","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]
console.log(window.ethereum)
/* 3. Prompt user to sign in to MetaMask */
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


// 4. Creating variables for reusable dom elements
const formSection = document.querySelector(".email-form-section");
const showFormBtn = document.querySelector(".show-email-form-btn");
const detailsSection = document.querySelector(".detail-section");
const acceptButton = document.querySelector("#accept");
const refuseButton = document.querySelector("#refuse");
const refreshBtn = document.querySelector(".refresh-details-btn");

/* 5. Function to set contract details */
const setNewAcceptance = (acceptance = false) => {
  // update button value
  acceptButton.value = "Accepting...";

  /* 5.1 Get inputs from form */
  const emailAdressInput = document.querySelector("#email-address");
  // 5.2 Getting values from the inputs
  const emailAdress = emailAdressInput.value;
  const timeStampResponse = Date.now().toString()
  console.log('emailAdress', emailAdress)
  console.log('timeStampResponse', timeStampResponse)
  console.log('acceptance', acceptance)
  /* 5.3 Set details in smart contract */
  EmailReceiptContract.setEmailReceipt(emailAdress, timeStampResponse, acceptance.toString())
    .then(() => {
      // update button value
      acceptButton.value = "Accepting...";

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

/* Function to set details on click of button */
acceptButton.addEventListener("click", () => setNewAcceptance(true));
refuseButton.addEventListener("click", () => setNewAcceptance(false));

/* 6. Function to get details */
const getCurrentStatus = async () => {
  acceptButton.value = "Getting status...";
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
showFormBtn.addEventListener("click", () => {
  detailsSection.style.display = "none";
  formSection.style.display = "block";
  acceptButton.value = "Submit";
});

/* 8. Function to refresh details */
refreshBtn.addEventListener("click", (e) => {
  e.target.innerText = "Refreshing...";
  getCurrentStatus().then(() => {
    e.target.innerText = "Refreshed";
    setTimeout(() => {
      e.target.innerText = "Refresh";
    }, 2000);
  });
});
