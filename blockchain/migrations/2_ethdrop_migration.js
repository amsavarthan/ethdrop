const EthDrop = artifacts.require("EthDrop");

module.exports = function(deployer) {
    deployer.deploy(EthDrop);
};