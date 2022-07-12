
contract SimpleStorageTest {
    uint myVariable;

    event Deposit(
        address indexed user,
        uint etherAmount,
        uint time,
        string log
    );

    function deposit() public payable {
        emit Deposit(msg.sender, msg.value, block.timestamp, 'wubalubadubdub');
    }

    function set(uint x) public {
        myVariable = x;
    }
    function get() view public returns (uint) {
        return myVariable;
    }
}