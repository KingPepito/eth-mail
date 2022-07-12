pragma solidity ^0.8.0;

import "./EmailRecept_Contract.sol";

contract EmailRecept_Factory {
    EmailRecept[] private _emailRecepts;
    function createEmailRecept(
        string memory email,
        string memory acceptance,
        string memory timeStampResponse
) public {
        EmailRecept emailRecept = new EmailRecept(
            email,
            acceptance,
            timeStampResponse
        );
        _emailRecepts.push(emailRecept);
    }
    function allEmailRecepts(uint256 limit, uint256 offset)
    public
    view
    returns (EmailRecept[] memory coll)
    {
        return coll;
    }
}