var EmailReceipt_Contract = artifacts.require("EmailReceipt_Contract");

module.exports = function(deployer) {
  deployer.deploy(EmailReceipt_Contract);
};