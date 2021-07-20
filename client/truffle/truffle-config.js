const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const infura_endpoint = process.env.INFURA_ENDPOINT;
const path = require('path');

module.exports = {
    contracts_build_directory: path.join(__dirname, '../src/contracts'),
    networks: {
        development: {
            host: '127.0.0.1',
            port: 8545,
            network_id: '*',
        },

        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, infura_endpoint),
            network_id: 4,
            gas: 5500000, // Ropsten has a lower block limit than mainnet
            confirmations: 2, // # of confs to wait between deployments.
            timeoutBlocks: 200, // # of blocks before a deployment times out 
            skipDryRun: true,
        },
    },
};