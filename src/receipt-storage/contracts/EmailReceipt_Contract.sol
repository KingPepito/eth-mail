// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

// 1. Creating a new contract
contract EmailReceipt_Contract{
    // 2. Declaring our smart contract state variables
    string public email;
    string public acceptance;
    string public timeStampResponse;

    constructor(
        // User email
        string memory _email,
        // True if the user accepted the email
        string memory _acceptance,
        string memory _timeStampResponse
    ) public {
        email = _email;
        acceptance = _acceptance;
        timeStampResponse = _timeStampResponse;
    }

    // 3. Creating a set function
    function setEmailReceipt(
        string memory newEmail,
        string memory newAcceptance,
        string memory newTimeStampResponse
    ) public {
        email = newEmail;
        acceptance = newAcceptance;
        timeStampResponse = newTimeStampResponse;
    }

    // 4. Creating a fetch function
    function getEmailReceipt() public view returns (
        string memory,
        string memory,
        string memory
    ){
        return (email, acceptance, timeStampResponse);
    }
}
