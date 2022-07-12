pragma solidity 0.8.15;
contract SimpleStorage {
   uint myVariable;

   function set(uint x) public {
     myVariable = x;
   }
   function get() view public returns (uint) {
     return myVariable;
   }
}