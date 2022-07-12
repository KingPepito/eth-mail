var Pet_Contract = artifacts.require("Pet_Contract");

module.exports = function(deployer) {
  deployer.deploy(Pet_Contract);
};