pragma solidity ^0.8.0;

import "./EmailReceipt_Contract.sol";

contract EmailReceipt_Contract_Factory2 {
    EmailReceipt_Contract[] private _emailReceipts;

    function createEmailReceipt_Contract(
        string memory email,
        string memory acceptance,
        string memory timeStampResponse
    ) public {
        EmailReceipt_Contract emailRecept = new EmailReceipt_Contract(
            email,
            acceptance,
            timeStampResponse
        );
        _emailReceipts.push(emailRecept);
    }
    function allEmailReceipt_Contracts()
    public
    view
    returns (EmailReceipt_Contract[] memory coll)
    {
        return _emailReceipts;
    }

    event storedNumber(
        string indexed oldNumber,
        address sender
    );

    function test() public returns (string memory testas, address sender) {
        emit storedNumber(
            'testas',
            msg.sender
        );
        return (testas, msg.sender);
    }
}