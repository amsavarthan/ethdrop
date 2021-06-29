const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infura_endpoint = process.env.INFURA_ENDPOINT;
const path = require("path")

module.exports = {

    contracts_build_directory: path.join(__dirname, "../client/src/contracts"),
    networks: {

        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*",
        },

        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, infura_endpoint),
            network_id: 4,
            skipDryRun: true
        },

    }
};