// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

// 1. Creating a new contract
contract EmailReceipt_Contract{
    // 2. Declaring our smart contract state variables
    // User email
    string public email;
    // True if the user accepted the email
    string public acceptance;
    string public timeStampResponse;

    // 3. Creating a set pet function
    function setEmailReceipt(
        string memory newEmail,
        string memory newAcceptance,
        string memory newTimeStampResponse
    ) public {
        email = newEmail;
        acceptance = newAcceptance;
        timeStampResponse = newTimeStampResponse;
    }

    // 4. Creating a fetch pet function
    function getEmailReceipt() public view returns (
        string memory,
        string memory,
        string memory
    ){
        return (email, acceptance, timeStampResponse);
    }
}
