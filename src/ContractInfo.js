import {ethers} from "ethers"
// 1. Declare global variable to store the web3 instance
import {useEffect, useState} from "react";
import DotLoader from "./DotLoader";


const ContractInfo = ({address, index}) => {
  const [loading, setLoading] = useState(true)
  const [info, setInfo] = useState({})

  let EmailReceiptContract;
  const EmailReceiptContract_ABI = [{"inputs":[{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_acceptance","type":"string"},{"internalType":"string","name":"_timeStampResponse","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"acceptance","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"email","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timeStampResponse","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newEmail","type":"string"},{"internalType":"string","name":"newAcceptance","type":"string"},{"internalType":"string","name":"newTimeStampResponse","type":"string"}],"name":"setEmailReceipt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getEmailReceipt","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}]

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      const signer = provider.getSigner(accounts[0]);

      /* 3.1 Create instance OF smart contract */
      EmailReceiptContract = new ethers.Contract(
        address,
        EmailReceiptContract_ABI,
        signer
      );
    });
  });

  /* 6. Function to get details */
  const getCurrentStatus = async () => {
    // acceptButton.value = "Getting status...";
    /* 6.1 Get details from smart contract */
    const emailReceipt = await EmailReceiptContract.getEmailReceipt();
    /* 6.3 emailReceipt is an array of 3 strings [email, acceptance, timeStampResponse] */
    const email = emailReceipt[0];
    const timeStampResponse = emailReceipt[1];
    const acceptance = emailReceipt[2];
    setLoading(false)
    setInfo({email, timeStampResponse, acceptance})
  };

  useEffect(() => {
    setTimeout(getCurrentStatus, 2000)
  }, [])

  return <tr>
    {loading ? <DotLoader/> : <>
      <td>{index}</td>
      <td>{info.email}</td>
      <td>{info.timeStampResponse}</td>
      <td>{info.acceptance === 'true' ? '✔' : info.acceptance === 'waiting' ? '🕚' : '✘' }</td>
    </>}


  </tr>
}

export default ContractInfo