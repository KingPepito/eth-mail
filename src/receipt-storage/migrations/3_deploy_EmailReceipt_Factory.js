var EmailReceipt_Factory = artifacts.require("EmailReceipt_Factory");

module.exports = function(deployer) {
  deployer.deploy(EmailReceipt_Factory);
};