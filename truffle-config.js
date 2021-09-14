const HDWalletProvider = require('truffle-hdwallet-provider');
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

require('dotenv').config({path: '.env'});

// Create connection to DataHub Celo Network node
// https://learn.figment.io/network-documentation/celo/tutorial/deploying-smart-contracts-on-celo-with-truffle
const web3 = new Web3(process.env.POAP_CELO_TEST_URL);

const client = ContractKit.newKitFromWeb3(web3);

// Initialize account from our private key
const account = web3.eth.accounts.privateKeyToAccount(process.env.POAP_CELO_TEST_PK);

// We need to add private key to ContractKit in order to sign transactions
client.addAccount(account.privateKey);


module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*',
    },
    ropsten: {
      provider: function() {
        if (!process.env.POAP_ROPSTEN_PK) {
          console.error('POAP_ROPSTEN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_ROPSTEN_PK,
          'https://ropsten.infura.io/v3/cf7a7eed37254ec4b95670607e76a917'
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 3,
    },
    kovan: {
      provider: function() {
        if (!process.env.POAP_KOVAN_PK) {
          console.error('POAP_KOVAN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_ROPSTEN_PK,
          'https://kovan.infura.io/v3/cf7a7eed37254ec4b95670607e76a917'
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 3,
    },
    sokol: {
      provider: function() {
        if (!process.env.POAP_SOKOL_PK) {
          console.error('POAP_SOKOL_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_SOKOL_PK,
          "https://sokol.poa.network"
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 77,
    },
    xdai: {
      provider: function() {
        if (!process.env.POAP_XDAI_PK) {
          console.error('POAP_XDAI_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_XDAI_PK,
          "https://dai.poa.network"
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 100,
    },
    mainnet: {
      provider: function() {
        if (!process.env.POAP_MAIN_PK) {
          console.error('POAP_MAIN_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_MAIN_PK,
          'https://mainnet.infura.io/v3/cf7a7eed37254ec4b95670607e76a917'
        );
      },
      gas: 5000000,
      gasPrice: 5e9, // 5 gwei (check https://ethgasstation.info/)
      network_id: 1,
    },
    binancetestnet: {
      provider: function() {
        if (!process.env.POAP_BINANCE_TEST_PK) {
          console.error('POAP_BINANCE_TEST_PK env variable is needed');
          process.abort();
        }
        return new HDWalletProvider(
          process.env.POAP_BINANCE_TEST_PK,
          'https://data-seed-prebsc-1-s1.binance.org:8545'
        );
      },
      gas: 5000000,
      gasPrice: 5e9,
      network_id: 97,
    },
    celotestnet: {
      provider: function() {
        if (!process.env.POAP_CELO_TEST_PK) {
          console.error('POAP_CELO_TEST_PK env variable is needed');
          process.abort();
        }
        if (!process.env.POAP_CELO_TEST_URL) {
          console.error('POAP_CELO_TEST_URL env variable is needed');
          process.abort();
        }
        return client.connection.web3.currentProvider; // CeloProvider
      },
      gas: 5000000,
      gasPrice: 6e9,
      network_id: 44787  // latest Alfajores network id
    },
  },
  compilers: {
    solc: {
      version: '0.5.17',
      settings: {
        evmVersion: "istanbul",
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  plugins: [
    'truffle-plugin-blockscout-verify'
  ],
};
